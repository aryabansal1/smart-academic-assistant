chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'metadataExtracted') {
    document.getElementById('title').innerText = message.metadata.title || 'Not found';

    const authorsList = document.getElementById('authors');
    authorsList.innerHTML = '';
    if (message.metadata.authors?.length > 0) {
      message.metadata.authors.forEach(author => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = author.url;
        a.textContent = author.name;
        a.target = '_blank';
        li.appendChild(a);
        authorsList.appendChild(li);
      });
    } else {
      authorsList.innerHTML = '<li>Not found</li>';
    }

    document.getElementById('abstract').innerText = message.metadata.abstract || 'Not found';
  }
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    function: () => {
      const title = document.querySelector('h1.document-title')?.innerText.trim();
      const authors = Array.from(document.querySelectorAll('span.authors-info a')).map(a => ({
        name: a.querySelector('span')?.textContent.trim(),
        url: a.href
      }));
      let abstract = document.querySelector('div.abstract-text')?.innerText.trim();
      if (abstract?.toLowerCase().startsWith("abstract: abstract:")) {
        abstract = abstract.replace(/^abstract:\s*/i, '').trim();
      } else if (abstract?.toLowerCase().startsWith("abstract:")) {
        abstract = abstract.replace(/^abstract:\s*/i, '').trim();
      }

      chrome.runtime.sendMessage({ type: 'metadataExtracted', metadata: { title, authors, abstract } });
    }
  });
});