export async function evolveFromFailure(message: string, error: string) {
  const shardId = `shard:${Date.now()}`;
  const shard = {
    origin: message,
    failure: error,
    created_at: new Date().toISOString(),
    status: "seed"
  };

  await TRACEPAD_KV.put(shardId, JSON.stringify(shard));
  return shardId;
}
