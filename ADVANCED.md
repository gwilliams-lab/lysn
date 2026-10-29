# Advanced Features

Advanced lysn features: spectrogram, formants & pitch, confidence scores, customizing the IPA keyboard, and in-browser MFA re-alignment.

[← Back to README](README.md) · [Transcription →](TRANSCRIPTION.md) · [Usage →](USAGE.md)

## Spectrogram & formants

The spectrogram auto-renders at high resolution as you scroll/zoom — there are currently no manual tuning settings (no mel-bands/FFT-size dropdown); window size, FFT size, and dB range are fixed.

- **Hover** — a dashed crosshair line follows your cursor with a live frequency readout (e.g. `342 Hz` / `3.42 kHz`), lining up with the fixed axis tick labels (100 Hz–8 kHz) shown to the left of the panel.
- **Right-click** — opens a menu with:
  - **Spectrogram settings** — "↻ Force Refresh" (forces an immediate recompute of the current view instead of waiting for the automatic background refresh) and "⟳ Regenerate formants & pitch" (recomputes F1/F2/F3/F0 for the current view and shows all four tracks)
  - **Colormap** — Jet, Inferno, Viridis, or Greys

A small strip in the top-right corner of the spectrogram is always visible, with four independent checkboxes — **F0**, **F1**, **F2**, **F3** — to show or hide each track without opening the menu. Checking a box should always recompute the acoustic feature for the current view.

- **F1/F2/F3** — Praat-style scatter dots (not a connected line), one per analysis frame, computed by Praat's Burg algorithm (via `parselmouth`) with a 5500 Hz ceiling.
- **F0 (pitch)** — a connected gold line (Praat's autocorrelation "To Pitch" method), with no computed values at unvoiced frames.

> **Note:** Force Refresh and Regenerate formants & pitch require the `aligner` conda environment (created by `setup.sh`) and the Vite dev server (`npm run dev`) — they are not available in production builds. The frequency crosshair works everywhere, including production builds, since it's computed entirely in the browser with no server round-trip.

**Long audio (> 10 min):** the base spectrogram is not computed on load to avoid blocking the browser. The spectrogram area shows a placeholder — right-click → "↻ Force Refresh" to generate it for the current view. For audio over 30 minutes, a warning banner appears reminding you to save frequently (`Ctrl/Cmd+S`), as the browser holds the full decoded audio in memory.

---

## Confidence scores

Word tiles with a Whisper confidence score are color-coded:
- **Red** — low confidence (score near 0)
- **Yellow** — medium confidence (score near 0.5)
- **Green** — high confidence (score near 1.0)

Words with no score — and phoneme/custom tiles, which never carry one — default to a muted lavender instead. Words you've manually created, edited, or marked **Validate word** are always a fixed teal, regardless of score; see [Confidence scores & edited words](USAGE.md#confidence-scores--edited-words) in USAGE.md for the full editing/validation workflow.

Click **Scores** in the toolbar to open the Confidence Dashboard, which shows:
- Mean, median, min, max scores
- 10-bin histogram
- Color legend
- 5 lowest-confidence words — click any of them to jump the playhead and view to it

---

## Customizing the IPA keyboard

When you rename a phoneme tile, an IPA virtual keyboard appears. Its symbols are read from `frontend-reactjs/public/ipa_keys.json` — edit that file to add, remove, or change the available IPA symbols.

Each entry maps an IPA symbol to an example word, with `**bold**` marking the part of the word that makes the sound (shown in the key's hover tooltip):

```json
{
  "ʃ": "**sh**ip",
  "tʃ": "**ch**oke",
  "oʊ": "b**oa**t"
}
```

The file loads on startup, so changes take effect on the next page reload.

---

## In-browser MFA re-alignment

The **MFA** button re-runs forced phoneme alignment on a selected region without leaving the browser. It requires the MFA Flask server running alongside the frontend.

Start the server **in a separate terminal** before using this feature:

```bash
conda activate aligner
python mfa_server.py
```

You should see:
```
INFO  MFA server ready on http://localhost:5050
INFO    Acoustic model : english_us_arpa
INFO    Dictionary     : english_us_arpa
```

The server loads the alignment model once (~15 s startup), then handles each request in 1–4 s.

**To use it:**
1. Click **MFA** — if multiple words overlap the selection you'll be asked to pick one word to align, or align all of them together
2. When the job completes, phone boundaries are merged into the PHN tier

Up to 4 alignment jobs can be queued at once. A dropdown badge on the button shows queue status. If a word is out-of-vocabulary, the server automatically substitutes the closest dictionary match and shows an orange warning toast.

**Common errors:**

| Error | Fix |
|---|---|
| Server not reachable | Start `mfa_server.py` and confirm startup message |
| Word not in dictionary | Edit the label to a known spelling; OOV words are auto-substituted |
| Audio too short | Selected region is under ~50 ms |
| MFA alignment failed | Check the terminal running `mfa_server.py` |

To use a different language:
```bash
MFA_ACOUSTIC_MODEL=french_mfa MFA_DICTIONARY=french_mfa python mfa_server.py
```
