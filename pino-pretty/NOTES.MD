## Using a [Pino-pretty library](https://github.com/pinojs/pino/blob/master/docs/pretty.md)

- There is Good [docs](https://www.npmjs.com/package/pino-pretty) to understand and use it easily
- node js profile results

```

clinic doctor --autocannon [ /items ] -- node . | pino-pretty --config=.pino-prettyrc

```

### Results

┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬───────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max   │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼───────┤
│ Latency │ 0 ms │ 1 ms │ 2 ms  │ 3 ms │ 0.76 ms │ 0.69 ms │ 16 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴───────┘
┌───────────┬─────────┬─────────┬────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%    │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 4367    │ 4367    │ 8471   │ 8671    │ 7979.4  │ 1233.14 │ 4364    │
├───────────┼─────────┼─────────┼────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 1.44 MB │ 1.44 MB │ 2.8 MB │ 2.87 MB │ 2.64 MB │ 408 kB  │ 1.44 MB │
└───────────┴─────────┴─────────┴────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

80k requests in 10.01s, 26.4 MB read

