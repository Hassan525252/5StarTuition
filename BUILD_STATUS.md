# BUILD STATUS — V5 REDONE

**CURRENT BUILD: V5 REDONE**

## Corrected
- Approved V5 main homepage image embedded at the correct aspect ratio.
- Approved V5 tutor card embedded as the exact locked visual, preventing portrait/text wrapping and sizing drift.
- Tutor card set to the approved landscape proportions and two-line visual gap.
- Desktop hero widened to closely match the approved first-viewport reference.
- Existing FREE-trial booking functionality retained.

## Deployment
Cloudflare Root directory: `/`
Build command: `npm run build`
Deploy command: `npx wrangler deploy`

Note: local npm dependency installation timed out in the build environment; final validation should occur through the existing Cloudflare build pipeline.
