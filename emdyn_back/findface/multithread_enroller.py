#!/usr/bin/env python3
# import os
# import os.path
import aiohttp
import asyncio
# import json
import sys
from time import time

FACE_URL = 'http://facenapi.ip:port/v0/face'
TOKEN = 'alphanumerictoken'
FILELIST = 'filelist.txt'
THREADS = 24


def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


finished_cnt = 0


async def fetcher(q):
    global finished_cnt
    headers = {'Authorization': 'Token ' + TOKEN}
    async with aiohttp.ClientSession(loop=loop) as session:
        while True:
            name = await q.get()
            name = name[0]
            print("%s start processing" % (name))
            try:
                data = aiohttp.FormData()
                data.add_field('mf_selector', 'all')
                data.add_field('meta', name)
                with open(name, 'rb') as photo_fh:
                    data.add_field('photo', photo_fh,
                                   filename=name, content_type='image/jpeg')
                    async with session.post(FACE_URL,
                                            headers=headers,
                                            data=data) as response:
                        if response.status == 200:
                            print("%s success" % (name))
                        else:
                            print("%s FAIL ERROR: %d" %
                                  (name, response.status))
            finally:
                q.task_done()
                finished_cnt = finished_cnt + 1


async def stat(loop, q):
    global finished_cnt
    start_time = time()
    prev_val = finished_cnt
    while True:
        await asyncio.sleep(1)
        avg_speed = finished_cnt/(time() - start_time)
        last_speed = (finished_cnt - prev_val)/1
        eprint("SPEED: avg=%.2f/s last=%.2f/s | finished: %d" %
               (avg_speed, last_speed, finished_cnt))
        prev_val = finished_cnt
        if q.empty():
            break


async def reader(loop, q):
    with open(FILELIST) as f:
        for name in f:
            name = name.split('\n')
            await q.put(name)
    await q.join()


if __name__ == '__main__':
    loop = asyncio.get_event_loop()

    q = asyncio.Queue(maxsize=1000)
    tasks = [
        loop.create_task(stat(loop, q)),
        loop.create_task(reader(loop, q))
    ]
    for t in range(THREADS):
        tasks.append(loop.create_task(fetcher(q)))

    loop.run_until_complete(asyncio.gather(*tasks))