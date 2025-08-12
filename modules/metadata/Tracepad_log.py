# shard: tracepad_log
# ritual: log_event
# phase: metadata

import json, os

def log_tracepad(metadata: dict, log_path: str = "./tracepad.json"):
    if os.path.exists(log_path):
        with open(log_path, "r") as f:
            data = json.load(f)
    else:
        data = []

    data.append(metadata)

    with open(log_path, "w") as f:
        json.dump(data, f, indent=2)
