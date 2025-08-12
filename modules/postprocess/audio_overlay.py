# shard: audio_overlay
# ritual: merge_audio
# phase: postprocess

import moviepy.editor as mp

def merge_audio(video_path: str, audio_path: str, output_path: str):
    video = mp.VideoFileClip(video_path)
    audio = mp.AudioFileClip(audio_path).set_duration(video.duration)
    final = video.set_audio(audio)
    final.write_videofile(output_path, codec="libx264", audio_codec="aac")
