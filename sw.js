// Guarda os arquivos do jogo no celular para funcionar sem internet.
const CACHE = "devendo-v6";
const FILES = ["./", "./index.html", "./manifest.json", "./privacidade.html", "./img/px_fundo.png", "./img/px_fundo_fazenda.png", "./img/px_fundo_praia.png", "./img/px_fundo_vila.png", "./img/px_frente.png", "./img/px_tres_quartos.png", "./img/px_andar.png", "./img/px_aj_dog0.png", "./img/px_aj_dog1.png", "./img/px_aj_dog2.png", "./img/px_aj_dog3.png", "./img/px_aj_dogouro0.png", "./img/px_aj_dogouro1.png", "./img/px_aj_dogouro2.png", "./img/px_aj_dogouro3.png", "./img/px_aj_fabrica.png", "./img/px_aj_jef0.png", "./img/px_aj_jef1.png", "./img/px_aj_osv_frente.png", "./img/px_aj_osv_w0.png", "./img/px_aj_osv_w1.png", "./img/px_aj_osv_w2.png", "./img/px_aj_osv_w3.png", "./img/px_aj_pastel.png", "./img/px_aj_pombo0.png", "./img/px_aj_pombo1.png", "./img/px_aj_robo.png", "./img/px_aj_tart0.png", "./img/px_aj_tart1.png", "./img/px_aj_valdemar.png", "./img/px_aj_valdemar_porta.png", "./img/px_aj_valdemar_rosto.png", "./img/px_aj_vo.png", "./img/icone-1024.png", "./img/icone-180.png", "./img/icone-192.png", "./img/icone-48.png", "./img/icone-512.png", "./img/icone-maskable-192.png", "./img/icone-maskable-512.png"];
self.addEventListener("install", e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e=>{
  const u = new URL(e.request.url);
  const page = e.request.mode==="navigate" || /\.(html|json|js)$/.test(u.pathname);
  if(page){ e.respondWith(fetch(e.request).then(r=>{ const c=r.clone(); caches.open(CACHE).then(k=>k.put(e.request,c)); return r; }).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html")))); return; }
  e.respondWith(caches.match(e.request).then(r=>r || fetch(e.request)));
});
