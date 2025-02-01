#!/usr/bin/env python

import asyncio
import aioconsole
import json

FPS = 165
CHAR_WIDTH = 10
CONTAINER_WIDTH = 150
WAIT_TIME = 4
SLIDE_SPEED = 50

playing = False
paused = False
name = ''

state = 'wait'
wait_passed = 0
slide_offset = 0

async def reset():
  global state, wait_passed, slide_offset

  state = 'wait'
  wait_passed = 0
  slide_offset = 0
  await aioconsole.aprint(f'{slide_offset:f}px')


async def handleStdin():
  global playing, paused, name

  while True:
    line = await aioconsole.ainput()
    data = json.loads(line)

    newName = data['name']
    if newName != name or newName == '':
      await reset()

    name = newName
    paused = data['paused']
    playing = data['playing']

    if not playing:
      await reset()


async def handleAnimation():
  global state, wait_passed, slide_offset, playing, paused, name

  while True:
    await asyncio.sleep(1 / FPS)

    if paused or not playing:
      continue

    if state == 'wait':
      wait_passed += 1 / FPS

      if wait_passed >= WAIT_TIME and len(name) * CHAR_WIDTH >= CONTAINER_WIDTH:
        state = 'out'
        slide_offset = 0

    elif state == 'out':
      slide_offset += 1 / FPS * SLIDE_SPEED
      await aioconsole.aprint(f'{-slide_offset:f}px')

      if slide_offset >= len(name) * CHAR_WIDTH:
        state = 'in'
        slide_offset = CONTAINER_WIDTH

    elif state == 'in':
      slide_offset -= 1 / FPS * SLIDE_SPEED
      slide_offset = max(slide_offset, 0)
      await aioconsole.aprint(f'{slide_offset:f}px')

      if slide_offset <= 0:
        await reset()


async def main():
  await asyncio.gather(handleStdin(), handleAnimation())

asyncio.run(main())
