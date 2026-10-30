// lysn website copy. Edit this file, then refresh the page.
//
// HTML is allowed inside fields named html or titleHtml (links, <em>, <br>, <code>).
// Demo embeds:
//   { type: 'youtube', id: 'VIDEO_ID' }
//   { type: 'video', src: 'assets/demos/clip.mp4' }
//   { type: 'image', src: 'assets/demos/shot.png', alt: '...' }
//   { type: 'none' }
// Put local clips and images in docs/assets/demos/.

window.LYSN = {
  github: 'https://github.com/gwilliams-lab/lysn',
  lab: {
    name: 'Gwilliams Laboratory of Speech Neuroscience',
    url: 'https://gwilliamslab.stanford.edu',
  },

  nav: {
    demo: 'Demo',
    faq: 'FAQ',
    github: 'GitHub ↗',
  },

  hero: {
    eyebrow: '', // Introducing lysn · Open-source speech annotation
    titleHtml: 'Generate, correct, and export <br> <em>speech annotations.<br></em>',
    dekHtml: '<code>lysn</code> is an open-source platform for generating, inspecting, and correcting speech annotations. It combines automatic transcription and alignment with a browser-based editor for annotations in standard TextGrid formats.',
    cta: { label: 'Get started on GitHub', sublabel: 'Clone the repo and follow the setup guide to run lysn locally.' },
  },

  byline: [
    { text: 'Gwilliams Laboratory of Speech Neuroscience', href: 'https://gwilliamslab.stanford.edu' },
  ],

  demos: [
    {
      label: 'From recording to annotations',
      badge: '',
      caption: 'Embedded demo: follow a short recording through annotation, correction, and export.',
      defaultTab: 1,
      tabs: [
        {
          title: '01 · Generate',
          heading: 'Start with a recording',
          copy: 'Automatic transcription and alignment on a short audio clip.',
          input: 'Audio clip',
          output: 'Initial annotations',
          embed: { type: 'image', src: 'assets/demos/Generate.gif', alt: 'Generating annotations from a recording' },
        },
        {
          title: '02 · Correct',
          heading: 'Inspect, adjust, and revisit',
          copy: 'An annotation being corrected, then revisited through the iterative workflow.',
          input: 'Initial annotations',
          output: 'Reviewed annotations',
          embed: { type: 'image', src: 'assets/demos/Correct.gif', alt: 'Correcting an annotation in lysn' },
        },
        {
          title: '03 · Export',
          heading: 'Return to your research',
          copy: 'Corrected annotations exported in Praat TextGrid format.',
          input: 'Reviewed annotations',
          output: 'TextGrid',
          embed: { type: 'image', src: 'assets/demos/Save.gif', alt: 'Saving annotations as a TextGrid' },
        },
      ],
    },
  ],

  introTitle: 'Motivations',
  intro: [
    {
      html: 'Speech and language researchers increasingly use natural, continuous speech to study language processing (<a href="https://pubmed.ncbi.nlm.nih.gov/32656294/" target="_blank" rel="noopener">Hamilton &amp; Huth, 2018</a>). Recordings such as conversations, podcasts, and audiobooks often require annotations before researchers can use them in their analyses.',
    },
  ],

  definitionsIntro: 'The workflow above touches on several distinct tasks that go into annotating speech. Before going further, it’s worth defining some terms:',
  definitions: [
    {
      term: 'Word Transcription',
      html: 'Converting speech audio into written text',
    },
    {
      term: 'Phoneme Transcription',
      html: 'Convert text or speech audio directly into a sequence of phoneme labels',
    },
    {
      term: 'Alignment',
      html: 'Matching speech content (e.g. word or phoneme) to the time point in the speech audio where it occurred',
    },
  ],

  bridge: {
    html: 'Automatic annotations require inspection and, often, manual correction. The extent to which manual correction is required depends on audio background noise, recording quality, as well as features of the speech content (e.g. clarity in speaker pronunciation, overlapping speech) (<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12435784/#bib148" target="_blank" rel="noopener">Agmon, et. al, 2025</a>). The process of speech annotating is iterative: correcting word transcripts may require rerunning alignment, followed by further inspection and adjustment. Moving between separate tools and custom scripts makes that cycle slow and tedious. <code>lysn</code> brings these steps into one workflow so researchers can move more easily between automatic processing and manual correction.',
  },

  features: {
    title: 'Features',
    html: 'There are a couple of key features in <code>lysn</code> that we are particularly excited about. Take a look at the embedded demos below to see them in action!',
    items: [
      {
        title: 'Integrated MFA alignment',
        html: 'Select a stretch of audio and rerun the Montreal Forced Aligner from inside the editor. Aligned phones are written back onto the phoneme tier, so a corrected transcript can be realigned without leaving <code>lysn</code>.',
        embed: { type: 'image', src: 'assets/demos/MFA.gif', alt: 'Running Montreal Forced Aligner on a selection in lysn' },
      },
      {
        title: 'Confidence scores',
        html: 'Each word is colored by the automatic transcription’s confidence (e.g. from whisperX, from low to high). Uncertain words stand out and are clickable, so they are easy to find and check before you export. If you make an edit to a word, the confidence scores and the score dashboard are updated to reflect your changes.',
        embed: { type: 'image', src: 'assets/demos/Scores.gif', alt: 'Word intervals colored by confidence score' },
      },
    ],
  },

  sections: [
    {
      titleHtml: 'Built for experienced and first-time annotators',
      paragraphs: [
        '<code>lysn</code> supports detailed annotation work through additional TextGrid tiers and visual inspection of acoustic properties, including pitch and formants.',
        'Feedback from high school, undergraduate, and graduate students was integrated into <code>lysn</code> to support people who are learning to annotate. For example, the IPA keyboard includes example words to help users identify the sounds represented by each symbol.',
      ],
      placeholder: {
        title: 'Explore the IPA keyboard alongside an annotated audio clip.',
        embed: { type: 'image', src: 'assets/demos/IPAKeys.gif', alt: 'IPA keyboard beside an annotated audio clip' },
      },
    },
    {
      titleHtml: 'Where lysn fits',
      paragraphs: [
        '<code>lysn</code> builds on existing speech annotation tools and community conventions, including the WhisperX automatic recognition system (<a href="https://arxiv.org/abs/2303.00747" target="_blank" rel="noopener">Bain et. al, 2023</a>), the Montreal Forced Aligner (<a href="https://arxiv.org/abs/2606.18466" target="_blank" rel="noopener">McAuliffe et, al. 2026</a>), and the <a href="https://www.fon.hum.uva.nl/praat/manual/TextGrid.html" target="_blank" rel="noopener">Praat TextGrid format</a>. We additionally took inspiration from the <a href="https://www.audacityteam.org/" target="_blank" rel="noopener">Audacity</a> graphical interface. Our ultimate focus with <code>lysn</code> is a workflow that links cutting-edge automatic annotation tools to interactive review and correction, while supporting users with different levels of annotation experience.',
      ],
    },
  ],

  faq: {
    title: 'FAQ',
    items: [
      {
        question: 'Do I need a transcript, or can I start with audio alone?',
        answers: [
          'You can start with audio alone! Run the automatic alignment pipeline as specific on the <a href="https://github.com/gwilliams-lab/lysn/blob/main/TRANSCRIPTION.md" target="_blank" rel="noopener">Transcription</a> page.',
          'If you have a text transcript that you’ve already checked, you can use this to perform alignment without running the initial transcription step. <a href="https://github.com/gwilliams-lab/lysn/blob/main/TRANSCRIPTION.md#using-a-reference-transcript" target="_blank" rel="noopener">See how to do this here</a>.',
        ],
      },
      {
        question: 'Which languages does lysn support?',
        answers: [
          'WhisperX is a multilingual model that will auto-detect the language in your speech audio. In order to enable forced alignment in other languages, download and specify the MFA language model you would like to use in the command-line call to the aligner.',
          'See <a href="https://github.com/gwilliams-lab/lysn/blob/main/TRANSCRIPTION.md#using-a-reference-transcript" target="_blank" rel="noopener">here</a> for more information.',
        ],
      },
      {
        question: 'Does my audio stay on my computer?',
        answers: [
          'Yes, since the browser-based tool is run locally, all audio will stay on your computer.',
        ],
      },
      {
        question: 'Can I import existing TextGrids and continue editing them?',
        answers: [
          'Yes, if you have an existing TextGrid that you have been editing, you can load it into the annotation tool via the <code>Load TextGrid</code> button and continue to work on it. Note, in order to use the browser-based tool you will need both an audio file as well as an existing TextGrid. Remember to save your TextGrid early and often to prevent losing your work.',
        ],
      },
    ],
  },

  contributors: {
    title: 'Contributors',
    paragraphs: [
      '<code>lysn</code> was initially designed and developed by Ilina Bhaya-Grossman and Ali Sartaz Khan. Allison Lievano Gomez and Rishan Checker subsequently helped with testing and feature expansion. This work was carried out in the <a href="https://gwilliamslab.stanford.edu" target="_blank" rel="noopener">Gwilliams Laboratory of Speech Neuroscience</a>.',
      'Do you see a feature that you’d like to add to the <code>lysn</code> platform? Found a bug in the current repository? We hope that <code>lysn</code> becomes a community tool and we welcome your contributions!',
      'To contribute to the <code>lysn</code> repository, take a look at the <a href="https://github.com/gwilliams-lab/lysn/blob/main/CONTRIBUTING.md">Contributing</a> page as well as the <a href="https://github.com/gwilliams-lab/lysn/blob/main/CODE_OF_CONDUCT.md">Code of Conduct</a>. If you’d like to contact the original developers directly, reach out to ilinabg [at] stanford.edu',
    ],
  },

  release: {
    title: 'Release',
    html: '<code>lysn</code> v0.1.0 is the first public release. See the <a href="https://github.com/gwilliams-lab/lysn/releases" target="_blank" rel="noopener">release notes</a> for highlights and known limitations, and please report issues on <a href="https://github.com/gwilliams-lab/lysn/issues" target="_blank" rel="noopener">GitHub</a>.',
  },

  cite: {
    title: 'How to cite',
    paragraphs: [
      'If you use <code>lysn</code> in your research, please cite it as:',
      'Bhaya-Grossman, I., Khan, A. S., Lievano Gomez, A., Checker, R., &amp; Gwilliams, L. (2026). <em>lysn: Open-source speech annotation.</em> Zenodo. <a href="https://doi.org/10.5281/zenodo.23787330" target="_blank" rel="noopener">https://doi.org/10.5281/zenodo.23787330</a>',
    ],
    bibtex: `@software{lysn2026,
  author    = {Bhaya-Grossman, Ilina and Khan, Ali Sartaz and Lievano Gomez, Allison and Checker, Rishan and Gwilliams, Laura},
  title     = {lysn: Open-source speech annotation},
  year      = {2026},
  publisher = {Zenodo},
  doi       = {10.5281/zenodo.23787330},
  url       = {https://doi.org/10.5281/zenodo.23787330}
}`,
  },

  ack: {
    title: 'Acknowledgments',
    html: 'We thank members of the Gwilliams Laboratory of Speech Neuroscience for feedback throughout development, particularly Jill Kries and Joyce Tang. We also thank Maya Inbar for detailed interface feedback and feature suggestions.',
  },

  ai: {
    title: 'AI usage disclosure',
    html: 'If you couldn\'t tell from the slick website, contributors used generative AI tools to implement and refactor source code. AI was not used to make significant design decisions or to administer usage surveys of the tool.',
  },

  footer: ['lysn · Speech annotation', 'Gwilliams Lab'],
};
