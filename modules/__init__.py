# modules/__init__.py
# ritual: discover_shards
# phase: setup

import os
import importlib.util
import inspect

SHARD_REGISTRY = {}

def discover_shards(base_path="modules"):
    for phase in ["synthesis", "postprocess", "metadata"]:
        phase_path = os.path.join(base_path, phase)
        if not os.path.isdir(phase_path):
            continue

        for filename in os.listdir(phase_path):
            if filename.endswith(".py"):
                shard_path = os.path.join(phase_path, filename)
                module_name = f"{phase}.{filename[:-3]}"
                spec = importlib.util.spec_from_file_location(module_name, shard_path)
                module = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(module)

                for name, obj in inspect.getmembers(module):
                    if inspect.isfunction(obj):
                        ritual = getattr(obj, "__ritual__", name)
                        SHARD_REGISTRY[ritual] = {
                            "phase": phase,
                            "module": module,
                            "function": obj
                        }

def get_shard(ritual_name):
    return SHARD_REGISTRY.get(ritual_name)

# Optional: auto-discover on import
discover_shards()
