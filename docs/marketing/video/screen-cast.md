# Marketing Demo Video Screen Cast

<!-- based on https://gemini.google.com/app/11b0abc9c693b376 and related conversations -->

## Tools

https://getopenscreen.com is great!

## Length

For hero landing pages, keep it concise (ideally under 8–15s; grand max. 30-40s), looping smoothly on the core "aha!" moment.

Alternatively, show a crisp poster image with a "Watch 40s Demo" play button that opens a modal player (or embeds Vimeo/YouTube/Wistia/native video with transport controls) so the heavy file is fetched only on demand.

## Record

Record e.g. web browsers on fullscreen (F11) - in 16:9 from a 4k screen.

Zoom >=200% in the browser (not later on OpenScreen; that too, separately).

## Export

Export from OpenScreen in:

* 1080p (1920x1080) Quality Resolution
* 30 FPS

## Audio

Narrate what's going on, and use OpenScreen's cool Transcript Captions.

If needed, until [openscreen#1104](https://github.com/getopenscreen/openscreen/issues/1104), remove the audio track like this:

    ffmpeg -i input.mp4 -c:v copy -an output.mp4

## MP4

    ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -an -movflags +faststart input-optimized23.mp4

or with slightly lower quality for smaller file size:

    ffmpeg -i input.mp4 -c:v libx264 -crf 24 -preset slow -an -movflags +faststart input-optimized24.mp4

## Poster

    ffmpeg -ss 00:00:00.500 -i input.mp4 -frames:v 1 -q:v 80 input-poster.webp

## HTML

```html
<section class="hero-container">
  <div class="video-frame">
    <video autoplay loop muted playsinline preload="metadata" width="1920" height="1080"
      poster="/images/hero-screencast-poster.webp"
      src="/videos/hero-screencast.mp4">
    </video>
  </div>
</section>
```

with:

```css
/* Container sizing & boundaries */
.hero-container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 1.5rem;
}

/*
 * 1. aspect-ratio reserves the exact box before the media downloads.
 * 2. Background color prevents flashes while the poster or first frame decodes.
 */
.video-frame {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #0b0f17; /* Match your app or frame background */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}

/* Ensure the video strictly fills the reserved container */
.video-frame video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

The poster, width & height eliminate Cumulative Layout Shift (CLS) by ensuring the browser reserves the exact layout box before the video metadata loads, while providing a lightweight poster image to avoid a blank white or black flash.

## WebM

WebM can make it even smaller, is license free, but doesn't work on older Apple devices:

    ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 32 -b:v 0 -an -speed 2 output.webm

* -c:v libvpx-vp9: Modern VP9 video codec.
* -crf 32 -b:v 0: Constant Quality mode (adjust between 28 for higher quality and 36 for smaller size).
* -an: Strips audio tracks completely (mandatory for silent background video).
* -speed 2: Optimized balance between encoding speed and compression density.

Alternatively use more modern AV1 instead of VP9:

    ffmpeg -i input.mp4 -c:v libsvtav1 -crf 30 -preset 6 -pix_fmt yuv420p -an output-av1.webm

* -c:v libsvtav1: The reference open-source AV1 encoder library (fast and heavily optimized for multi-core CPUs).
* -crf 30: AV1’s CRF scale behaves differently than H.264. Values between 28 and 34 yield visual transparency with tiny footprints.
* -preset 6: A practical balance between compute time and compression efficiency (preset 4 is slower and smaller; preset 8 is faster).
* -pix_fmt yuv420p: Enforces 8-bit 4:2:0 chroma subsampling for universal hardware and browser decoder compatibility.
* -an: Strips audio.

Note: You can wrap AV1 into either .webm or .mp4—both containers support it, but .webm is standard for open web streaming.

And then offer both:

```html
<video autoplay loop muted playsinline ...>
  <source src="hero.webm" type="video/webm"> <!-- Modern, lightweight -->
  <source src="hero.mp4" type="video/mp4">   <!-- Universal fallback -->
</video>
```

Using only a single file (MP4) might be easier to start with.

## Mobile

A desktop screencast scaled down to a 390px iPhone screen is usually unreadable.

Use CSS media queries or separate <source> tags to serve:

* Desktop/Tablet: The 1080p/30fps landscape screencast.
* Mobile: A cropped 720p version focusing on the core action, or a lightweight static hero image/illustration with a "Watch demo" modal button to save mobile data.

## GIF

No way, José! (It has huge huge file size, and limited to a 256-color palette.)
