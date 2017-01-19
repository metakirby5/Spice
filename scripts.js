// API: /Applications/Textual.app/Contents/Resources/JavaScript/API/core.js
'use strict'

const d = document

// Coalesce sender nicks
const line = el => {
  const sender = el.querySelector('.sender')
  const nick = sender.getAttribute('nickname')
  return {el, sender, nick}
}

const coalesce = (/* cur, prev */ ...args) => {
  const [cur, prev] = args.map(line)
  if (cur.nick === prev.nick) {
    cur.sender.innerHTML = ''
  }
}

Textual.newMessagePostedToView = id => {
  const el = d.querySelector(`#line-${id}`)
  coalesce(el, el.previousElementSibling)
}

Textual.viewFinishedLoadingHistory = _ => {
  Array.from(d.querySelector('#historic_messages').children)
    .reduce((prev, cur) => {
      if (prev) {
        coalesce(cur, prev)
      }
      return cur
    })
}

// Fade out loading screen
Textual.viewFinishedLoading = Textual.viewFinishedReload = _ => {
    Textual.fadeOutLoadingScreen(1.00, 0.95)
}
