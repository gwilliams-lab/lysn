(function () {
  const data = window.LYSN;
  if (!data) return;

  const navLinks = document.getElementById('nav-links');
  const story = document.getElementById('story');

  function externalLink(href, label) {
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = label;
    return a;
  }

  const workflowLink = document.createElement('a');
  workflowLink.href = '#workflow';
  workflowLink.textContent = data.nav.workflow;
  navLinks.append(workflowLink, externalLink(data.github, data.nav.github));

  if (data.hero.eyebrow) {
    document.getElementById('eyebrow-text').textContent = data.hero.eyebrow;
  } else {
    document.querySelector('.eyebrow').hidden = true;
  }
  document.getElementById('hero-title').innerHTML = data.hero.titleHtml;
  document.getElementById('dek').innerHTML = data.hero.dekHtml;

  const byline = document.getElementById('byline');
  if (data.byline && data.byline.length) {
    data.byline.forEach((text) => {
      const span = document.createElement('span');
      span.textContent = text;
      byline.append(span);
    });
  } else {
    byline.hidden = true;
  }

  function paragraph(html, id) {
    const p = document.createElement('p');
    if (id) p.id = id;
    p.innerHTML = html;
    return p;
  }

  if (data.introTitle) {
    const h2 = document.createElement('h2');
    h2.textContent = data.introTitle;
    story.append(h2);
  }
  data.intro.forEach((item) => story.append(paragraph(item.html, item.id)));

  const definitions = document.createElement('div');
  definitions.className = 'definitions';
  data.definitions.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'definition';
    const term = document.createElement('strong');
    term.textContent = item.term;
    const body = document.createElement('span');
    body.innerHTML = item.html;
    row.append(term, body);
    definitions.append(row);
  });
  story.append(definitions);

  if (data.bridge) story.append(paragraph(data.bridge.html, data.bridge.id));

  if (data.demo) story.append(renderSimpleDemo(data.demo));
  (data.demos || []).forEach((demo, demoIndex) => story.append(renderDemo(demo, demoIndex)));
  if (data.features) story.append(renderFeatures(data.features));

  (data.sections || []).forEach((section) => {
    const h2 = document.createElement('h2');
    h2.innerHTML = section.titleHtml;
    story.append(h2);
    (section.paragraphs || []).forEach((html) => story.append(paragraph(html)));
    if (section.placeholder) story.append(renderPlaceholder(section.placeholder));
  });

  if (data.faq) story.append(renderFaq(data.faq));
  if (data.contribute) story.append(renderProse(data.contribute));

  if (data.note) {
    const note = document.createElement('div');
    note.className = 'note';
    const h3 = document.createElement('h3');
    h3.textContent = data.note.title;
    note.append(h3, paragraph(data.note.html));
    story.append(note);
  }

  if (data.cta) {
    const cta = externalLink(data.cta.href, '');
    cta.className = 'cta';
    cta.append(document.createTextNode(data.cta.label + ' '));
    const arrow = document.createElement('span');
    arrow.textContent = '↗';
    cta.append(arrow);
    story.append(cta);
  }

  if (data.ack) story.append(renderProse(data.ack));
  if (data.ai) story.append(renderProse(data.ai, 'ai'));

  const footer = document.getElementById('footer');
  (data.footer || []).forEach((text) => {
    const span = document.createElement('span');
    span.textContent = text;
    footer.append(span);
  });

  function renderFeatures(features) {
    const wrap = document.createDocumentFragment();
    if (features.title) {
      const h2 = document.createElement('h2');
      h2.textContent = features.title;
      wrap.append(h2);
    }
    if (features.html) wrap.append(paragraph(features.html));
    (features.items || []).forEach((item) => {
      const figure = document.createElement('figure');
      figure.className = 'demo';
      const top = document.createElement('div');
      top.className = 'demo-top';
      const label = document.createElement('span');
      label.textContent = item.title;
      top.append(label);
      const body = document.createElement('div');
      body.className = 'demo-body';
      body.append(paragraph(item.html));
      const embed = renderEmbed(item.embed);
      if (embed) body.append(embed);
      figure.append(top, body);
      wrap.append(figure);
    });
    return wrap;
  }

  function renderPlaceholder(placeholder) {
    if (placeholder.embed) {
      const figure = document.createElement('figure');
      figure.className = 'demo';
      const body = document.createElement('div');
      body.className = 'demo-body';
      const embed = renderEmbed(placeholder.embed);
      if (embed) body.append(embed);
      figure.append(body);
      if (placeholder.title) {
        const caption = document.createElement('figcaption');
        caption.textContent = placeholder.title;
        figure.append(caption);
      }
      return figure;
    }
    const box = document.createElement('div');
    box.className = 'placeholder';
    if (placeholder.html) {
      box.innerHTML = placeholder.html;
    } else {
      box.append(document.createTextNode(placeholder.title));
      if (placeholder.detail) {
        const small = document.createElement('small');
        small.textContent = placeholder.detail;
        box.append(small);
      }
    }
    return box;
  }

  function renderProse(block, className) {
    const wrap = document.createElement('div');
    if (className) wrap.className = className;
    const h2 = document.createElement('h2');
    h2.textContent = block.title;
    wrap.append(h2);
    if (block.html) wrap.append(paragraph(block.html));
    (block.paragraphs || []).forEach((html) => wrap.append(paragraph(html)));
    return wrap;
  }

  function renderFaq(faq) {
    const wrap = document.createElement('div');
    wrap.className = 'faq';
    const h2 = document.createElement('h2');
    h2.textContent = faq.title;
    wrap.append(h2);
    faq.items.forEach((item) => {
      const h3 = document.createElement('h3');
      h3.textContent = item.question;
      wrap.append(h3);
      item.answers.forEach((html) => wrap.append(paragraph(html)));
    });
    return wrap;
  }

  function renderSimpleDemo(demo) {
    const figure = document.createElement('figure');
    figure.className = 'demo';
    const body = document.createElement('div');
    body.className = 'demo-body';
    const embed = renderEmbed(demo.embed);
    if (embed) body.append(embed);
    const caption = document.createElement('figcaption');
    caption.textContent = demo.caption;
    figure.append(body, caption);
    return figure;
  }

  function renderDemo(demo, demoIndex) {
    const figure = document.createElement('figure');
    figure.className = 'demo';

    const top = document.createElement('div');
    top.className = 'demo-top';
    const label = document.createElement('span');
    label.textContent = demo.label;
    top.append(label);
    if (demo.badge) {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = demo.badge;
      top.append(badge);
    }

    const tabs = document.createElement('div');
    tabs.className = 'tabs';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', demo.label);

    const panel = document.createElement('div');
    panel.className = 'demo-body';
    panel.id = 'demo-panel-' + demoIndex;
    panel.setAttribute('role', 'tabpanel');
    panel.tabIndex = 0;

    const heading = document.createElement('h3');
    const copy = document.createElement('p');
    const embedSlot = document.createElement('div');
    const diagram = document.createElement('div');
    diagram.className = 'diagram';
    diagram.setAttribute('aria-hidden', 'true');
    const input = document.createElement('span');
    const arrow = document.createElement('b');
    arrow.textContent = '→';
    const output = document.createElement('span');
    diagram.append(input, arrow, output);
    panel.append(heading, copy, embedSlot, diagram);

    const buttons = demo.tabs.map((tab, i) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.id = 'demo-' + demoIndex + '-tab-' + i;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-controls', panel.id);
      button.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      button.textContent = tab.title;
      button.addEventListener('click', () => select(i));
      button.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault();
        const next = (i + (event.key === 'ArrowRight' ? 1 : demo.tabs.length - 1)) % demo.tabs.length;
        select(next);
        buttons[next].focus();
      });
      return button;
    });
    tabs.append(...buttons);

    function select(i) {
      const tab = demo.tabs[i];
      buttons.forEach((button, n) => button.setAttribute('aria-selected', n === i ? 'true' : 'false'));
      panel.setAttribute('aria-labelledby', buttons[i].id);
      heading.textContent = tab.heading;
      copy.textContent = tab.copy;
      input.textContent = tab.input;
      output.textContent = tab.output;
      embedSlot.replaceChildren();
      const embed = renderEmbed(tab.embed);
      if (embed) embedSlot.append(embed);
    }

    select(0);

    const caption = document.createElement('figcaption');
    caption.textContent = demo.caption;
    figure.append(top, tabs, panel, caption);
    return figure;
  }

  function renderEmbed(embed) {
    if (!embed || embed.type === 'none') return null;
    const wrap = document.createElement('div');
    wrap.className = 'embed';
    if (embed.type === 'youtube' && embed.id) {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + embed.id;
      iframe.title = 'lysn demo';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      wrap.append(iframe);
      return wrap;
    }
    if (embed.type === 'video' && embed.src) {
      const video = document.createElement('video');
      video.src = embed.src;
      video.controls = true;
      video.playsInline = true;
      wrap.append(video);
      return wrap;
    }
    if (embed.type === 'image' && embed.src) {
      const img = document.createElement('img');
      img.src = embed.src;
      img.alt = embed.alt || '';
      img.addEventListener('error', () => {
        const note = document.createElement('div');
        note.className = 'placeholder';
        note.textContent = 'Add ' + embed.src.split('/').pop() + ' to docs/assets/demos/.';
        wrap.replaceWith(note);
      });
      wrap.append(img);
      return wrap;
    }
    return null;
  }
})();
