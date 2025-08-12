# shard: ltx_video_gen
# ritual: video_from_image_prompt
# phase: synthesis

import torch
from diffusers import DiffusionPipeline
from diffusers.utils import load_image, export_to_video
import os, uuid
from datetime import datetime

def generate_video(
    image_url: str,
    prompt: str,
    output_dir: str = "./outputs",
    num_frames: int = 24,
    fps: int = 8,
    seed: int = None,
    use_cuda: bool = True
):
    device = "cuda" if use_cuda and torch.cuda.is_available() else "cpu"
    dtype = torch.float16 if device == "cuda" else torch.float32

    pipe = DiffusionPipeline.from_pretrained("Lightricks/LTX-Video", torch_dtype=dtype)
    pipe.to(device)

    image = load_image(image_url)
    generator = torch.manual_seed(seed) if seed else None
    result = pipe(image=image, prompt=prompt, num_frames=num_frames, generator=generator).frames[0]

    os.makedirs(output_dir, exist_ok=True)
    video_id = str(uuid.uuid4())[:8]
    timestamp = datetime.utcnow().isoformat()
    output_path = os.path.join(output_dir, f"{video_id}.mp4")

    export_to_video(result, output_path, fps=fps)

    return {
        "shard": "ltx_video_gen",
        "phase": "synthesis",
        "prompt": prompt,
        "image_url": image_url,
        "output_path": output_path,
        "num_frames": num_frames,
        "fps": fps,
        "seed": seed,
        "device": device,
        "timestamp": timestamp,
        "video_id": video_id
    }
