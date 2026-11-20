// Generates every page of the ZupO.si redesign into ./site
import { writeFileSync } from 'node:fs';
const V = Date.now();
const OUT = new URL('./site/', import.meta.url);

const ARR = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
const PHONE = '051 330 055', TEL = 'tel:+38651330055', SOS = 'sos@zupo.si', PORTAL = 'https://podpora.zupo.si/';

const services = [
  { slug: 'upravljanje-infrastrukture', name: 'Upravljanje infrastrukture', img: 'firewall.jpg',
    short: 'Strežniki, komunikacije in uporabniška oprema pod stalnim nadzorom.',
    cap: 'Preko 500 fizičnih in virtualnih strežnikov v upravljanju.',
    lead: 'Informacijsko-komunikacijska infrastruktura je hrbtenica vsakega podjetja. Že od začetka delovanja skrbimo za celostno upravljanje infrastrukture svojih strank.',
    facts: [['500', '+', 'fizičnih in virtualnih strežnikov v upravljanju'], ['24/7', '', 'monitoring vseh naprav'], ['SLA', '', 'zagotovljena in spremljana razpoložljivost']],
    blocks: [
      ['Strežniško-komunikacijska infrastruktura', ['Usposobljeni smo za upravljanje različnih postavitev strežniške infrastrukture s pripadajočimi komunikacijami. Upravljamo, vzdržujemo in nadzorujemo opremo pri strankah (on-premise), najeto opremo v oblaku in kombinirane postavitve.', 'Konfiguracije omrežnih naprav so nam zelo domače, upravljamo tudi požarne pregrade naslednje generacije (Next Generation Firewall). Izvajamo redne preventivne tehnične in varnostne aktivnosti ter konstanten monitoring vseh naprav, skladno s smernicami za varovanje informacijskega premoženja strank.']],
      ['Uporabniška oprema', ['Redno podporo strankam nudimo praktično vsak dan. Večina del se nanaša na pomoč pri uporabi in napakah:'], ['Strojna oprema: odjemalci, periferija, komunikacije', 'Standardna programska oprema: operacijski sistemi, pisarniška orodja, poštni odjemalci', 'Prvi nivo podpore namenskim aplikativnim rešitvam']],
      ['Varnostno kopiranje', ['Za največjo zaščito pred incidenti še vedno velja pravilo kakovostne in pravilno izvedene varnostne kopije. Podatke hranimo znotraj vašega okolja, kopije pa izvajamo na ločene sisteme ali na oddaljene lokacije: v lastne podatkovne centre ali naše najete kapacitete v drugih podatkovnih centrih.', 'Nudimo tudi zakup podatkovnega polja za arhivske kopije ali razširitev kapacitet.']],
    ] },
  { slug: 'nacrtovanje-ikt-sistemov', name: 'Načrtovanje IKT sistemov', img: 'desk.jpg',
    short: 'Načrtovanje in optimizacija novih sistemov ter prenove obstoječih.',
    cap: 'Od ocene stanja do vzpostavitve, vzdrževanja in podpore.',
    lead: 'Vsako podjetje potrebuje pravilno in optimalno načrtovan informacijsko-komunikacijski sistem. Zgradimo povsem novega ali celovito prenovimo obstoječega.',
    facts: [['100', '+', 'zadovoljnih strank'], ['99', '%', 'dosegljivost sistema'], ['3000', '+', 'delujočih naprav']],
    blocks: [
      ['Celovito, od prvega do zadnjega koraka', ['Naredimo oceno trenutnega stanja, načrtujemo in optimiziramo sistem, izvedemo dela za vzpostavitev delovanja, nato pa sistem še vzdržujemo, upravljamo in vam nudimo podporo.'], ['Ocena trenutnega stanja', 'Načrtovanje in optimizacija', 'Vzpostavitev delovanja', 'Vzdrževanje, upravljanje in podpora']],
      ['Izkušnje in skladnost', ['Pri celotnem procesu nam pomagata strokovno znanje in dolgoletne izkušnje, upoštevamo pa tudi želje in predvsem potrebe strank. Skozi celoten potek načrtovanja in izvedbe skrbimo za skladnost s smernicami informacijske varnosti.']],
    ] },
  { slug: 'podpora', name: 'Podpora uporabnikom 24/7', img: 'support.jpg',
    short: 'Odzivna podpora, dosegljiva 24/7, vse dni v letu.',
    cap: 'ZupO.si Urgenca. Odziv že v nekaj trenutkih.',
    lead: 'Poleg redne podpore, ki jo izvajamo praktično vsak dan, nudimo tudi konstantno nujno podporo. Imenujemo jo ZupO.si Urgenca.',
    urg: true,
    blocks: [
      ['Na prvem mestu ste vi', ['Za vas smo dosegljivi 24/7, vse dni v letu. Lahko nam napišete e-pošto, nas pokličete ali uporabite personaliziran portal za podporo. Ne glede na izbiro lahko naš odziv pričakujete že v nekaj trenutkih.']],
      ['Na daljavo, na terenu ali z nadomestno opremo', ['Večino težav odpravimo kar na daljavo. Kadar to ni mogoče, se odpravimo na teren in težavo odpravimo na vaši lokaciji. Če težave ni mogoče odpraviti zaradi večje okvare opreme ali varnostnega incidenta, vam ponudimo nadomestno opremo.', 'Tu smo zato, da vam pomagamo, in tudi pri največjem problemu ne obupamo.']],
    ] },
  { slug: 'podatkovni-center', name: 'Podatkovni center', img: 'hall.jpg',
    short: 'Naš oblak. Lasten podatkovni center od leta 2012.',
    cap: 'Naš oblak. Vaši podatki na vam znani lokaciji.',
    lead: 'Že od leta 2012 upravljamo lasten podatkovni center Naš oblak, z najsodobnejšo opremo in sistemi.',
    facts: [['2012', '', 'lasten podatkovni center'], ['BGP', '', 'dvojno vpetje komunikacij'], ['24/7', '', 'fizično in tehnično varovanje']],
    blocks: [
      ['Pet plasti zaščite', [], ['Varnostni nadzor 24/7: protipožarni in protivlomni alarm, video nadzor in nadzor prehodov', 'Stalni nadzor klimatskih pogojev in zaščita pred vplivi okolja', 'Sistem gašenja s plinom, ki ščiti infrastrukturo in arhive', 'Lastna energetska oskrba ob prekinitvi zunanjega napajanja', 'Armirano-betonska konstrukcija za varnost ob naravnih nesrečah']],
      ['Komunikacije in strežniki', ['Najem napredne komunikacijske infrastrukture z dvojnim vpetjem komunikacij (BGP), optičnimi povezavami do večjih internetnih operaterjev in naprednimi požarnimi pregradami.', 'Omogočamo najem virtualnih strežnikov (Hyper-V, VMware) in spletnih storitev (Exchange, spletno gostovanje). Programsko opremo licenciramo po dejanski porabi (MS SPLA).']],
      ['Arhiviranje in replikacija', ['Najamete lahko diskovna polja za arhiviranje ali repliko. Omogočamo arhiviranje ali replikacijo na nadomestno opremo znotraj podatkovnega centra, za najzahtevnejše stranke pa tudi replikacijo strežnikov na oddaljene podatkovne centre, lastne in najete.']],
    ] },
  { slug: 'gostovanje', name: 'Gostovanje', img: 'server.jpg',
    short: 'E-pošta, domene in DNS, spletne strani, strežniki in aplikacije.',
    cap: 'Vse gostuje v našem lastnem podatkovnem centru.',
    lead: 'Vse storitve gostujejo v našem lastnem podatkovnem centru, na najnovejši strežniški in komunikacijski tehnologiji.',
    blocks: [
      ['Elektronska pošta', ['Stalna dosegljivost je bistvena za vsako podjetje. Gostujemo vaše poštne predale na tehnologiji Microsoft Exchange, z večjimi in zanesljivejšimi nabiralniki ter naprednimi funkcijami za arhiviranje, varnost in skladnost s predpisi.']],
      ['Domene in DNS zapisi', ['Gostujemo domene in DNS zapise. Vaša edina skrb je izbor domene, za registracijo in ureditev zapisov poskrbimo mi.']],
      ['Spletne strani', ['S Plesk tehnologijo ponujamo gostovanje spletnih strani v paketih, povsem prilagodljivih vašim potrebam. Dobite tudi dostop do svoje administrativne Plesk strani.']],
      ['Strežniki in namenske aplikacije', ['Specializirani smo za gostovanje strežnikov in namenskih aplikacij v lastnem podatkovnem centru.'], null, ['Več o podatkovnem centru', 'podatkovni-center.html']],
    ] },
  { slug: 'informacijska-varnost', name: 'Informacijska varnost', img: 'engineer.jpg',
    short: 'Penetracijski testi, politike, ozaveščanje in obravnava incidentov.',
    cap: 'Varovanje informacijskih sistemov je stalen proces.',
    lead: 'Varovanje informacijskih sistemov in podatkov je stalen proces. Naši strokovnjaki pri delu upoštevajo smernice in dobro prakso s tega področja.',
    facts: [['ISO', '', 'IEC 27001:2022 certifikat'], ['Safe', '', 'Mode portal za varovanje'], ['Pentest', '', 'penetracijski testi in svetovanje']],
    blocks: [
      ['Pereč problem na globalni ravni', ['Številni primeri zlorab v slovenskih organizacijah kažejo na vse večjo potrebo po varovanju informacijskega premoženja. Poleg tehničnih ukrepov v podjetja vpeljujemo pravilnike in politike ter izobražujemo in ozaveščamo uporabnike. Prav to se izkazuje kot eden najboljših ukrepov za informacijsko varno organizacijo.']],
      ['Safe Mode', ['V sodelovanju s Fakulteto za varnostne vede Univerze v Mariboru, katedro za informacijsko varnost, smo razvili portal Safe Mode. Celovit pristop k varovanju informacijskega premoženja, osredotočen na uporabnika, s tehnično podporo, pravnim svetovanjem in detektivskimi storitvami.']],
      ['Testi in incidenti', ['Izvajamo različne penetracijske teste, svetujemo in obravnavamo incidente.']],
    ] },
  { slug: 'registracija-domen', name: 'Registracija domen', img: 'fiber.jpg',
    short: 'Pooblaščeni registrar .SI domen. Uredimo tudi .com in druge.',
    cap: 'Pooblaščeni registrar .SI domen od leta 2005.',
    lead: 'Povečajte prepoznavnost in z lastno domeno izpostavite svojo profesionalnost. Smo pooblaščeni registrar .SI domen, uredimo pa tudi druge končnice.',
    domain: true,
    blocks: [
      ['Hitro in učinkovito', ['Zakup in registracijo lastne domene vam uredimo hitro in učinkovito. Že imate idejo za domeno? Kontaktirajte nas in uredimo, da bo domena postala vaša last.'], null, ['Cenik na domena.zupo.si', 'https://domena.zupo.si']],
    ] },
];

const timeline = [
  ['1990', 'Ustanovitev podjetja ZUPO d.o.o.'], ['1999', 'Podpis prve pogodbe o vzdrževanju'], ['2001', 'Nakup prvih poslovnih prostorov v IOC Trzin'],
  ['2004', 'Postanemo ponudnik elektronske pošte'], ['2005', 'Postanemo uradni registrar .SI domen'], ['2008', 'Selitev v nove prostore Borovec 11'],
  ['2010', 'Blagovna znamka za informacijsko varnost Safe Mode'], ['2012', 'Postavitev lastnega podatkovnega centra Naš oblak'], ['2013', 'Zasebni oblak za prve naročnike'],
  ['2017', 'Širitev poslovnih prostorov Borovec 11'], ['2018', 'Dodatne kapacitete pri večjem ponudniku certificiranih strežniških prostorov'],
  ['2021', 'Začetek gradnje novih poslovnih prostorov'], ['2022', 'Selitev v nove prostore, Ulica pod gozdom 6'], ['2025', 'Certifikata ISO 9001:2015 in ISO/IEC 27001:2022'],
];
const partners = ['paloalto', 'eset', 'cisco', 'hpe', 'microsoft', 'mikrotik', 'netapp', 'vmware', 'synology', 'veeam', 'ubiquiti'];

/* ---------------- shared chrome ---------------- */
const head = (title, desc) => `<!doctype html><html lang="sl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="description" content="${desc}"><meta name="robots" content="noindex">
<link rel="icon" href="assets/img/apple-touch-icon.png"><link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
<link rel="preload" href="assets/fonts/Aeonik-Medium.ttf" as="font" type="font/ttf" crossorigin>
<link rel="stylesheet" href="assets/style.css?v=${V}"></head><body>`;

const nav = () => `
<header class="nav">
  <a class="logo" href="index.html" aria-label="ZupO.si domov"><img src="assets/img/Logo100px.png" alt="ZupO.si logotip" width="100" height="100"><span>ZupO.si<em>make IT simple</em></span></a>
  <nav class="menu" aria-label="Glavni meni">
    <button data-mega aria-expanded="false">Storitve<span>▾</span></button>
    <a href="podjetje.html">Podjetje</a>
    <a href="p4d.html">P4D</a>
    <a href="kontakt.html">Kontakt</a>
    <a class="btn btn-ink" href="podpora.html"><i class="dot"></i>Urgenca 24/7</a>
  </nav>
  <button class="burger" aria-label="Meni" aria-expanded="false"><i></i><i></i></button>
</header>
<div class="mega" aria-label="Storitve">
  <div class="mega-list">${services.map(s => `<a href="${s.slug}.html" data-cap="${s.cap}"><b>${s.name}</b><small>${s.short}</small></a>`).join('')}</div>
  <div class="mega-pic">${services.map((s, i) => `<img src="assets/img/${s.img}" alt="" class="${i === 0 ? 'on' : ''}" loading="lazy">`).join('')}<p>${services[0].cap}</p></div>
</div>
<div class="scrim"></div>
<div class="mmenu">
  <h6>Storitve</h6>${services.map(s => `<a class="sub" href="${s.slug}.html">${s.name}</a>`).join('')}
  <h6>ZupO.si</h6><a href="podjetje.html">Podjetje</a><a href="p4d.html">Digitalizacija P4D</a><a href="kontakt.html">Kontakt</a>
  <a class="btn btn-ink" href="${TEL}"><i class="dot"></i>Urgenca ${PHONE}</a>
</div>`;

const footer = () => `
<footer class="foot">
  <div class="foot-top">
    <div>
      <div class="foot-logo"><div class="lw"><img src="assets/img/Logo100px.png" alt="ZupO.si logotip"></div></div>
      <address style="margin-top:28px">ZupO.si d.o.o.<br>Zaboršt pri Dolu 11b, 1262 Dol pri Ljubljani<br>Poslovna enota: Ulica pod gozdom 6, 1236 Trzin</address>
    </div>
    <div><h6>Storitve</h6><ul>${services.map(s => `<li><a href="${s.slug}.html">${s.name}</a></li>`).join('')}</ul></div>
    <div><h6>ZupO.si</h6><ul><li><a href="podjetje.html">Podjetje</a></li><li><a href="p4d.html">Digitalizacija P4D</a></li><li><a href="kontakt.html">Kontakt</a></li><li><a href="varstvo-osebnih-podatkov.html">Varstvo osebnih podatkov</a></li><li><a href="https://gravitom.zupo.si" target="_blank" rel="noopener">Gravitom</a></li><li><a href="https://zupo.si/video-gradiva/brAInbox/index.html" target="_blank" rel="noopener">brAInbox</a></li></ul></div>
    <div><h6>Urgenca 24/7</h6><ul><li><a href="${TEL}">${PHONE}</a></li><li><a href="mailto:${SOS}">${SOS}</a></li><li><a href="mailto:info@zupo.si">info@zupo.si</a></li><li><a href="${PORTAL}" target="_blank" rel="noopener">Portal za podporo</a></li></ul>
    <h6 style="margin-top:30px">Sledite nam</h6><ul><li><a href="https://www.linkedin.com/company/zuposi-doo" target="_blank" rel="noopener">LinkedIn</a></li><li><a href="https://www.facebook.com/zuposi" target="_blank" rel="noopener">Facebook</a></li></ul></div>
  </div>
  <div class="foot-big" aria-hidden="true">make <span>IT</span> simple</div>
  <div class="foot-eu">
    <div class="logos"><img src="assets/img/eu_noga.png" alt="Evropska unija"><img src="assets/img/mgrt.png" alt="MGRT"><img src="assets/img/sps1.png" alt="SPS"></div>
    <small>Naložbo sofinancirata Republika Slovenija in Evropska unija iz Evropskega sklada za regionalni razvoj. © 2026 ZupO.si d.o.o. Vse pravice pridržane.</small>
  </div>
</footer>
<script src="assets/vendor/gsap.min.js"></script><script src="assets/vendor/ScrollTrigger.min.js"></script><script src="assets/vendor/lenis.min.js"></script><script src="assets/main.js?v=${V}"></script>
</body></html>`;

const ctaBlock = () => `
<section class="sec wrap cta">
  <h2 class="d1 rv">Ni neumnih vprašanj.<br><span>Pišite nam.</span></h2>
  <div class="cta-row rv">
    <p class="lead" style="max-width:40ch">Izpolnite obrazec in odgovorili vam bomo v najkrajšem možnem času. Za nujne primere nas pokličite na ${PHONE}.</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn-cy" href="kontakt.html">Kontaktirajte nas ${ARR}</a><a class="btn btn-line" href="${TEL}">${PHONE}</a></div>
  </div>
</section>`;

/* ---------------- isometric data-centre layers ---------------- */
const layerSvg = () => {
  const cx = 320, w = 236, h = 136, t = 22, labels = ['Varnostni nadzor', 'Klimatski pogoji', 'Gašenje s plinom', 'Lastna energija', 'Armiran beton'];
  let g = '';
  for (let i = 4; i >= 0; i--) {
    const y = 150 + i * 70;
    const top = `${cx},${y - h} ${cx + w},${y} ${cx},${y + h} ${cx - w},${y}`;
    const l = `${cx - w},${y} ${cx},${y + h} ${cx},${y + h + t} ${cx - w},${y + t}`;
    const r = `${cx},${y + h} ${cx + w},${y} ${cx + w},${y + t} ${cx},${y + h + t}`;
    // rack blocks on the top plate only
    let deco = '';
    if (i === 0) for (let k = 0; k < 4; k++) {
      const bx = cx - 90 + k * 46, by = y - 20 + k * 26 - 30;
      deco += `<g class="ic"><polygon points="${bx},${by - 26} ${bx + 34},${by - 6} ${bx},${by + 14} ${bx - 34},${by - 6}" fill="#fff" opacity=".9"/><polygon points="${bx - 34},${by - 6} ${bx},${by + 14} ${bx},${by + 74} ${bx - 34},${by + 54}" fill="#E8EDF2"/><polygon points="${bx},${by + 14} ${bx + 34},${by - 6} ${bx + 34},${by + 54} ${bx},${by + 74}" fill="#D3DAE1"/><circle cx="${bx - 17}" cy="${by + 18}" r="2.2" fill="#00ADE7"/><circle cx="${bx - 17}" cy="${by + 30}" r="2.2" fill="#2BD9A0"/></g>`;
    }
    g += `<g class="pl" data-i="${i}"><polygon class="l" points="${l}"/><polygon class="r" points="${r}"/><polygon class="top" points="${top}"/>${deco}<text x="${cx + w + 34}" y="${y + 8}" font-family="Everett Mono, monospace" font-size="19" fill="#7A8492">0${i + 1} ${labels[i]}</text></g>`;
  }
  return `<svg viewBox="60 -20 860 620" role="img" aria-label="Pet plasti zaščite podatkovnega centra">${g}</svg>`;
};

/* ---------------- HOME ---------------- */
const ico = {
  bgp: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="10" cy="24" r="5"/><circle cx="38" cy="12" r="5"/><circle cx="38" cy="36" r="5"/><path d="M15 22l18-8M15 26l18 8"/></svg>',
  fib: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 30c10 0 10-12 20-12s10 12 20 12"/><path d="M4 38c10 0 10-12 20-12s10 12 20 12" opacity=".5"/><circle cx="44" cy="30" r="2.5" fill="currentColor"/></svg>',
  fw: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M24 4l16 6v12c0 11-7 18-16 22C15 40 8 33 8 22V10z"/><path d="M17 24l5 5 9-10"/></svg>',
  srv: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="6" width="36" height="10" rx="2"/><rect x="6" y="19" width="36" height="10" rx="2"/><rect x="6" y="32" width="36" height="10" rx="2"/><circle cx="12" cy="11" r="1.5" fill="currentColor"/><circle cx="12" cy="24" r="1.5" fill="currentColor"/><circle cx="12" cy="37" r="1.5" fill="currentColor"/></svg>',
};
const words = s => s.split(' ').map(w => `<span class="w">${w}</span>`).join(' ');

const home = () => head('ZupO.si · Vaš skrbnik za IT infrastrukturo', 'Upravljanje infrastrukture, lasten podatkovni center Naš oblak, podpora 24/7 in informacijska varnost. ZupO.si, Trzin.') + nav() + `
<main>
<section class="hero wrap">
  <h1 class="d1" style="font-size:clamp(40px,6.3vw,152px)"><span class="ln"><span class="gray">Vaš skrbnik za</span></span><span class="ln"><span>strežniško infrastrukturo,</span></span><span class="ln"><span>upravljanje komunikacij</span></span><span class="ln"><span><span class="gray">in</span> varnost na internetu.</span></span></h1>
  <div class="hero-row">
    <p class="lead">Ekipa 20 strokovnjakov s preko 25 let izkušenj. Upravljamo, vzdržujemo in varujemo vaše informacijsko okolje, da je vaša edina skrb vaš posel.</p>
    <div class="ctas"><a class="btn btn-cy" href="kontakt.html">Pogovorimo se ${ARR}</a><a class="btn btn-line" href="#storitve">Storitve</a></div>
  </div>
</section>
<div class="hero-media">
  <div class="hero-frame">
    <video autoplay muted loop playsinline preload="auto" poster="assets/img/hall.jpg"><source src="assets/video/hero.mp4" type="video/mp4"></video>
    <img class="slogan" src="assets/img/slogan.png" alt="make IT simple">
    <div class="status">
      <div class="status-top"><i class="dot"></i>Vse storitve delujejo</div>
      <div class="status-rows">
        <div><span>Dosegljivost storitev</span><b>99,9 %</b></div>
        <div><span>Nadzorovane naprave</span><b>3000+</b></div>
        <div><span>Naš oblak, Trzin</span><b data-ping>9.8 ms</b></div>
      </div>
      <div class="bars" aria-hidden="true"></div>
    </div>
  </div>
</div>

<section class="sec wrap intro">
  <div class="grid">
    <div class="intro-text"><p class="d3">${words('Podjetje ZupO.si je danes ekipa 20 strokovnjakov s preko 25 let izkušenj na področju zunanjega izvajanja informacijskih storitev. Upravljamo strežnike, komunikacije in uporabniško opremo, skrbimo za lasten podatkovni center in za varnost vaših podatkov.')}</p></div>
    <div class="intro-pic rv" data-par><img src="assets/img/building.jpg" alt="Poslovni prostori ZupO.si v Trzinu" loading="lazy"></div>
  </div>
  <div class="stats">
    <div class="stat rvs"><b><span data-count="25">0</span><sup>+</sup></b><span>let izkušenj z zunanjim izvajanjem IT storitev</span></div>
    <div class="stat rvs"><b><span data-count="100">0</span><sup>+</sup></b><span>zadovoljnih strank</span></div>
    <div class="stat rvs"><b><span data-count="500">0</span><sup>+</sup></b><span>fizičnih in virtualnih strežnikov v upravljanju</span></div>
    <div class="stat rvs"><b><span data-count="3000">0</span><sup>+</sup></b><span>delujočih naprav pod stalnim nadzorom</span></div>
  </div>
</section>

<section class="sec wrap" id="storitve" style="padding-top:0">
  <div class="svc-head"><h2 class="d2 rv">Vse za delujoče<br>IT okolje.</h2><p class="lead rv">Specializirani smo za upravljanje infrastrukture, načrtovanje sistemov in podporo uporabnikom, ki je dosegljiva vse dni v letu.</p></div>
  <div class="svc-list">${services.map(s => `<a class="svc rvs" href="${s.slug}.html"><h3>${s.name}</h3><p>${s.short}</p><span class="arr">${ARR}</span></a>`).join('')}</div>
  <div class="cursor-pic" aria-hidden="true">${services.map(s => `<img src="assets/img/${s.img}" alt="">`).join('')}</div>
</section>

<section class="sec wrap dc">
  <div class="dc-top"><h2 class="d2 rv">Naš oblak.<br><span class="gray">Lasten podatkovni center od leta 2012.</span></h2><p class="lead rv">Smo eno redkih podjetij, ki upravlja lasten podatkovni center. Vaši podatki so na varnem in shranjeni na vam znani lokaciji.</p></div>
  <div class="dc-hall rv" data-par><img src="assets/img/hall.jpg" alt="Podatkovni center Naš oblak" loading="lazy"><span class="tag">Naš oblak, Trzin</span></div>
  <div class="layers">
    <div class="layers-vis">${layerSvg()}</div>
    <div>
      ${[
        ['Varnostni nadzor 24/7', 'Fizično in tehnično varovanje celotnega objekta: strokovno spremljanje delovanja, protipožarni in protivlomni alarmni sistem, video nadzor in nadzor prehodov po prostorih.'],
        ['Stalni nadzor klimatskih pogojev', 'Zaščitni sistemi ves čas nadzorujejo klimatske pogoje in ščitijo opremo pred vplivi iz okolja.'],
        ['Gašenje s plinom', 'Protipožarni sistem z gašenjem s plinom ščiti informacijsko infrastrukturo in arhive pred uničenjem.'],
        ['Lastna energetska oskrba', 'Vsi sistemi v objektu delujejo nemoteno tudi ob prekinitvi zunanje energetske oskrbe.'],
        ['Armirano-betonska konstrukcija', 'Nosilna konstrukcija objekta zagotavlja varnost ob naravnih nesrečah in drugih večjih vplivih iz okolja.'],
      ].map((l, i) => `<div class="layer"><span class="n">0${i + 1} / 05</span><h3 class="d3">${l[0]}</h3><p class="lead" style="font-size:clamp(18px,1.3vw,24px)">${l[1]}</p></div>`).join('')}
    </div>
  </div>
  <div class="specs">
    <div class="spec rvs">${ico.bgp}<b>Dvojno vpetje komunikacij BGP</b></div>
    <div class="spec rvs">${ico.fib}<b>Optične povezave do večjih internetnih operaterjev</b></div>
    <div class="spec rvs">${ico.fw}<b>Napredne požarne pregrade</b></div>
    <div class="spec rvs">${ico.srv}<b>Virtualni strežniki Hyper-V in VMware</b></div>
  </div>
</section>

<section class="sec urg">
  <div class="huge" aria-label="24/7/365">24<span>/</span>7<span>/</span>365</div>
  <div class="wrap">
    <div class="urg-row">
      <h2 class="d3 rv">ZupO.si Urgenca.<br>Tu smo, ko nas najbolj potrebujete.</h2>
      <div class="rv"><p class="lead">Večino težav odpravimo kar na daljavo. Ko to ni mogoče, pridemo k vam, ob večji okvari ali varnostnem incidentu pa vam zagotovimo nadomestno opremo.</p>
      <p class="clock"><i class="dot"></i><span>Ljubljana <span data-clock>--:--:--</span></span><span>Dežurna ekipa je na voljo</span></p></div>
    </div>
    <div class="chans">
      <a class="chan rvs" href="${TEL}"><div><small>Pokličite</small><b>${PHONE}</b></div><span class="go">Kliči<i>${ARR}</i></span></a>
      <a class="chan rvs" href="mailto:${SOS}"><div><small>Pišite</small><b>${SOS}</b></div><span class="go">Pošlji<i>${ARR}</i></span></a>
      <a class="chan rvs" href="${PORTAL}" target="_blank" rel="noopener"><div><small>Portal za podporo</small><b>Odprite zahtevek</b></div><span class="go">Vstopi<i>${ARR}</i></span></a>
    </div>
    <div class="urg-pic rv" data-par><img src="assets/img/support.jpg" alt="Podpora uporabnikom ZupO.si" loading="lazy"></div>
  </div>
</section>

<section class="sec wrap">
  <h2 class="d2 rv">Brzina je naša vrlina.</h2>
  <div class="bento">
    <div class="b b1 cy rvs"><h3 class="d3">Odzivnost 24/7/365</h3><p>Naša ekipa skrbi za konstantno razpoložljivost in odzivnost. Pokličite nas, pošljite e-pošto ali odprite zahtevek na portalu.</p></div>
    <div class="b b2 rvs"><div><h3 class="h4">Vedno imamo vse pod nadzorom</h3><p>Z naprednim spremljanjem naprav napake odpravimo, še preden jih sploh zaznate.</p></div>
      <div><svg class="spark" viewBox="0 0 400 140" preserveAspectRatio="none"><defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#00ADE7" stop-opacity=".25"/><stop offset="1" stop-color="#00ADE7" stop-opacity="0"/></linearGradient></defs><path class="fill" d="M0 92 L25 88 L50 96 L75 80 L100 84 L125 70 L150 76 L175 60 L200 66 L225 50 L250 58 L275 40 L300 48 L325 34 L350 40 L375 26 L400 30 L400 140 L0 140Z"/><path class="ln" d="M0 92 L25 88 L50 96 L75 80 L100 84 L125 70 L150 76 L175 60 L200 66 L225 50 L250 58 L275 40 L300 48 L325 34 L350 40 L375 26 L400 30"/></svg>
      <div class="mon"><span>Dosegljivost <b>99,9 %</b></span><span>Naprave <b>3000+</b></span><span>Opozorila <b>0</b></span></div></div></div>
    <div class="b b3 img rvs"><img src="assets/img/desk.jpg" alt="" loading="lazy"><div class="t"><h3 class="h4">Po meri malih in srednjih organizacij</h3><p>Organizirani smo skladno z vašimi potrebami in pričakovanji. Vaša edina skrb postane vaš posel.</p></div></div>
    <div class="b b4 img rvs"><img src="assets/img/fiber.jpg" alt="" loading="lazy" style="object-position:50% 45%"><div class="t"><h3 class="h4">Varovanje informacijskega premoženja</h3><p>Upoštevamo varnostna priporočila in dobro prakso ter proaktivno preprečujemo socialni inženiring in zlonamerno kodo.</p></div></div>
  </div>
</section>

<section class="partners">
  <div class="partners-head wrap"><h2 class="d3 rv">Delamo s tehnologijo,<br>ki ji zaupate.</h2></div>
  <div class="marq">${partners.map(p => `<img src="assets/logos/${p}.png" alt="${p}" loading="lazy">`).join('')}</div>
</section>

<section class="sec wrap iso">
  <div class="grid">
    <div class="iso-pic rv"><img src="assets/img/90270.jpg" alt="Certifikata ISO/IEC 27001:2022 in ISO 9001:2015" loading="lazy"></div>
    <div class="iso-text">
      <h2 class="d3 rv">Certificirani za kakovost in varnost.</h2>
      <p class="lead rv" style="margin-top:28px">Leta 2025 smo pridobili certifikata ISO 9001:2015 in ISO/IEC 27001:2022 za načrtovanje, vzpostavitev, gostovanje, nadzor in upravljanje informacijskih sistemov ter izvedbo projektov.</p>
      <div class="iso-badges rv"><div><b>ISO/IEC 27001</b><small>Informacijska varnost</small></div><div><b>ISO 9001</b><small>Sistem vodenja kakovosti</small></div></div>
    </div>
  </div>
</section>

<section class="tl sec">
  <div class="tl-head wrap"><h2 class="d2">Od 1990<br><span class="gray">do danes.</span></h2><a class="btn btn-ink" href="podjetje.html">O podjetju ${ARR}</a></div>
  <div class="tl-track">${timeline.map(([y, t]) => `<div class="tl-item${['2012', '2025'].includes(y) ? ' hl' : ''}"><b>${y}</b><p>${t}</p></div>`).join('')}</div>
</section>

<section class="sec wrap">
  <h2 class="d2 rv">Znanje, ki raste<br><span class="gray">v nove produkte.</span></h2>
  <div class="eco">
    <a class="grav rvs" href="https://gravitom.zupo.si" target="_blank" rel="noopener"><span class="ring"></span><img src="assets/img/Gravitom.png" alt="Gravitom"><div><h3 class="d3">Čutite G-sile.</h3><p>Prvi simulator s trajnimi G-silami za usposabljanje voznikov. Do 3G trajne sile, 1 ms odzivnost in polna VR integracija.</p></div></a>
    <a class="brain rvs" href="https://zupo.si/video-gradiva/brAInbox/index.html" target="_blank" rel="noopener"><span class="ring"></span><img src="assets/img/brainbox.png" alt="brAInbox"><div><h3 class="d3">Organizacija, ki razume samo sebe.</h3><p>Povezano znanje, usmerjeni agenti in smiselna avtomatizacija. Moduli brAIn Editor, brAIn Action in brAIn Tools.</p></div></a>
  </div>
</section>
${ctaBlock()}
</main>` + footer();

/* ---------------- SERVICE PAGE ---------------- */
const servicePage = (s, i) => {
  const prev = services[(i + services.length - 1) % services.length], next = services[(i + 1) % services.length];
  const facts = s.facts ? `<section class="wrap" style="padding-top:clamp(70px,7vw,130px)"><div class="facts">${s.facts.map(f => `<div class="fact rvs"><b>${f[0]}<sup>${f[1]}</sup></b><span>${f[2]}</span></div>`).join('')}</div></section>` : '';
  const urg = s.urg ? `<section class="sec urg" id="isl"><div class="wrap"><h2 class="d2 rv">Izberite pot do nas.</h2><p class="lead rv" style="margin-top:24px;max-width:44ch">Ne glede na izbiro lahko odziv pričakujete že v nekaj trenutkih.</p>
    <p class="clock"><i class="dot"></i><span>Ljubljana <span data-clock>--:--:--</span></span><span>Dežurna ekipa je na voljo</span></p>
    <div class="chans"><a class="chan rvs" href="${TEL}"><div><small>Pokličite</small><b>${PHONE}</b></div><span class="go">Kliči<i>${ARR}</i></span></a><a class="chan rvs" href="mailto:${SOS}"><div><small>Pišite</small><b>${SOS}</b></div><span class="go">Pošlji<i>${ARR}</i></span></a><a class="chan rvs" href="${PORTAL}" target="_blank" rel="noopener"><div><small>Portal za podporo</small><b>Odprite zahtevek</b></div><span class="go">Vstopi<i>${ARR}</i></span></a></div></div></section>` : '';
  const dom = s.domain ? `<section class="wrap" style="padding-top:clamp(70px,7vw,130px)"><div class="facts">
    <div class="fact rvs"><b>.si</b><span>pooblaščeni registrar .SI domen od leta 2005</span></div><div class="fact rvs"><b>.com</b><span>in druge domenske končnice</span></div><div class="fact rvs"><b>DNS</b><span>gostovanje domen in DNS zapisov</span></div></div></section>` : '';
  return head(`${s.name} · ZupO.si`, s.lead) + nav() + `
<main>
<section class="page-hero wrap">
  <div class="crumbs"><a href="index.html">Domov</a><span>/</span><a href="index.html#storitve">Storitve</a></div>
  <h1 class="d1">${s.name}</h1>
  <p class="lead">${s.lead}</p>
</section>
<div class="page-pic" data-par><div data-par><img src="assets/img/${s.img}" alt="${s.name}"></div></div>
${facts}${dom}
<section class="sec wrap"><div class="blocks">${s.blocks.map(b => `<div class="blk rv"><h2 class="d3">${b[0]}</h2><div class="body">${(b[1] || []).map(p => `<p>${p}</p>`).join('')}${b[2] ? `<ul>${b[2].map(li => `<li>${li}</li>`).join('')}</ul>` : ''}${b[3] ? `<p style="margin-top:28px"><a class="btn btn-line" href="${b[3][1]}"${b[3][1].startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${b[3][0]} ${ARR}</a></p>` : ''}</div></div>`).join('')}</div></section>
${urg}
<section class="wrap" style="padding-top:clamp(70px,7vw,130px)"><div class="next"><a href="${prev.slug}.html"><small>Prejšnja storitev</small><b>${prev.name}</b></a><a class="r" href="${next.slug}.html"><small>Naslednja storitev</small><b>${next.name}</b></a></div></section>
${ctaBlock()}
</main>` + footer();
};

/* ---------------- PODJETJE ---------------- */
const podjetje = () => head('Podjetje · ZupO.si', 'ZupO.si zagotavlja varno, stabilno in razpoložljivo informacijsko okolje.') + nav() + `
<main>
<section class="page-hero wrap"><div class="crumbs"><a href="index.html">Domov</a><span>/</span><span>Podjetje</span></div>
  <h1 class="d1">Varno, stabilno<br><span class="gray">in razpoložljivo.</span></h1>
  <p class="lead">Naše poslanstvo je, da poslovnim partnerjem zagotavljamo varno, stabilno in razpoložljivo informacijsko okolje. Uresničujemo ga še danes, s kakovostnimi storitvami, strokovnim kadrom in utečenimi dejavnostmi.</p></section>
<div class="page-pic"><div data-par><img src="assets/img/building.jpg" alt="Poslovni prostori ZupO.si" style="object-position:50% 40%"></div></div>
<section class="sec wrap"><div class="blocks">
  <div class="blk rv"><h2 class="d3">Prihodnje generacije poslovnih okolij</h2><div class="body"><p>V podjetju ZupO.si želimo soustvarjati razvoj poslovnih informacijskih okolij prihodnjih generacij, zato v delo vpeljujemo najsodobnejšo tehnologijo, varnostne postopke in se ravnamo po smernicah dobre prakse.</p><p>Delujemo družbeno odgovorno in s svojim delovanjem podpiramo interese širše skupnosti.</p></div></div>
</div>
<div class="facts" style="margin-top:clamp(60px,6vw,110px)"><div class="fact rvs"><b>20</b><span>strokovnjakov v ekipi</span></div><div class="fact rvs"><b>25<sup>+</sup></b><span>let izkušenj</span></div><div class="fact rvs"><b>ISO</b><span>9001:2015 in ISO/IEC 27001:2022</span></div></div></section>
<section class="tl sec">
  <div class="tl-head wrap"><h2 class="d2">Naša pot.</h2></div>
  <div class="tl-track">${timeline.map(([y, t]) => `<div class="tl-item${['2012', '2025'].includes(y) ? ' hl' : ''}"><b>${y}</b><p>${t}</p></div>`).join('')}</div>
</section>
<section class="sec wrap iso"><div class="grid"><div class="iso-pic rv"><img src="assets/img/90270.jpg" alt="Certifikata ISO" loading="lazy"></div><div class="iso-text"><h2 class="d3 rv">Na oba certifikata smo ponosni.</h2><p class="lead rv" style="margin-top:28px">Certifikata ISO 9001:2015 in ISO/IEC 27001:2022 pokrivata načrtovanje, vzpostavitev, gostovanje, nadzor in upravljanje informacijskih sistemov ter izvedbo projektov. Zgledno ju vzdržujemo.</p></div></div></section>
${ctaBlock()}
</main>` + footer();

/* ---------------- P4D ---------------- */
const p4d = () => head('Digitalizacija podjetja P4D · ZupO.si', 'Digitalna transformacija podjetja ZUPO.SI d.o.o., javni razpis P4D ReactEU.') + nav() + `
<main>
<section class="page-hero wrap"><div class="crumbs"><a href="index.html">Domov</a><span>/</span><span>P4D</span></div>
  <h1 class="d1">Digitalna transformacija<br><span class="gray">ZUPO.SI d.o.o.</span></h1>
  <p class="lead">Javni razpis P4D ReactEU, spodbude za digitalno transformacijo. Uvajamo napredne digitalne rešitve za optimizacijo procesov, avtomatizacijo nadzora proizvodnje in razvoj digitalnih storitev na zahtevo.</p></section>
<section class="wrap"><div class="facts"><div class="fact rvs"><b style="font-size:clamp(36px,3.4vw,70px)">10/2024<br>02/2026</b><span>trajanje operacije</span></div><div class="fact rvs"><b style="font-size:clamp(36px,3.4vw,70px)">245.995,90 €</b><span>celotni proračun</span></div><div class="fact rvs"><b style="font-size:clamp(36px,3.4vw,70px)">66.670,00 €</b><span>EU financiranje</span></div></div></section>
<section class="sec wrap"><div class="blocks">
  <div class="blk rv"><h2 class="d3">Opis operacije</h2><div class="body"><p>Celovit in strateško voden proces nadgradnje poslovanja z uvajanjem naprednih digitalnih rešitev, optimizacijo procesov ter krepitvijo digitalnih kompetenc zaposlenih. Nadgrajena bo spletna stran in vzpostavljena B2B platforma, implementirani bodo PDM sistem, analitika voženj, IoT platforma za zajem podatkov v realnem času ter napredne AI analize na NVIDIA Workstation.</p><ul><li>Izkušnja kupca</li><li>Podatkovna strategija</li><li>Procesi in digitalne rešitve za podporo poslovanju</li><li>Razvoj digitalnih kadrov</li><li>Kibernetska varnost</li><li>Industrija 4.0</li></ul></div></div>
  <div class="blk rv"><h2 class="d3">Namen in cilji</h2><div class="body"><p>Sistematično preoblikovati poslovanje v smeri digitalno podprte, učinkovite, varne in podatkovno vodene organizacije.</p><ul><li>Celovito digitalno podprto poslovanje</li><li>Boljša uporabniška izkušnja kupcev in dolgoročni odnosi s partnerji</li><li>Strukturirana podatkovna strategija za boljše odločitve</li><li>Optimizacija in avtomatizacija ključnih procesov</li><li>Kibernetska odpornost in skladnost s predpisi</li><li>Razvoj digitalnih kompetenc in kultura stalnega učenja</li><li>Večja dodana vrednost na zaposlenega</li></ul>
  <p style="margin-top:28px"><a class="btn btn-line" href="assets/ZUPO.SI_Digital_Transformation_Strategy-4.pdf" target="_blank">Akcijski načrt (PDF) ${ARR}</a></p></div></div>
</div>
<div style="margin-top:clamp(60px,6vw,110px);display:flex;gap:16px;align-items:center;flex-wrap:wrap"><img src="assets/img/EU1.png" alt="Sofinancira Evropska unija" style="height:76px;width:auto"><img src="assets/img/feelslovenia.png" alt="I feel Slovenia" style="height:76px;width:auto"></div></section>
${ctaBlock()}
</main>` + footer();

/* ---------------- KONTAKT ---------------- */
const kontakt = () => head('Kontakt · ZupO.si', 'Kontaktirajte ZupO.si. Urgenca 24/7: 051 330 055, sos@zupo.si.') + nav() + `
<main>
<section class="page-hero wrap"><div class="crumbs"><a href="index.html">Domov</a><span>/</span><span>Kontakt</span></div>
  <h1 class="d1">Ni neumnih<br><span class="gray">vprašanj.</span></h1>
  <p class="lead">Izpolnite obrazec in potrudili se bomo, da vam odgovorimo v najkrajšem možnem času.</p></section>
<section class="wrap" style="padding-bottom:clamp(90px,10vw,200px)"><div class="contact-grid">
  <div class="cinfo">
    <a href="${TEL}"><small>Urgenca 24/7</small><b>${PHONE}</b></a>
    <a href="mailto:${SOS}"><small>Nujna podpora</small><b>${SOS}</b></a>
    <a href="mailto:info@zupo.si"><small>Splošna vprašanja</small><b>info@zupo.si</b></a>
    <div><small>Poslovna enota</small><b>Ulica pod gozdom 6<br>1236 Trzin</b></div>
    <div><small>Sedež</small><b>Zaboršt pri Dolu 11b<br>1262 Dol pri Ljubljani</b></div>
  </div>
  <form class="form" novalidate>
    <div class="field"><input id="f1" placeholder=" " autocomplete="name"><label for="f1">Ime in priimek</label></div>
    <div class="field"><input id="f2" placeholder=" " autocomplete="organization"><label for="f2">Podjetje</label></div>
    <div class="field"><input id="f3" type="email" placeholder=" " autocomplete="email"><label for="f3">E-pošta</label></div>
    <div class="field"><input id="f4" type="tel" placeholder=" " autocomplete="tel"><label for="f4">Telefon</label></div>
    <div class="field full"><textarea id="f5" placeholder=" "></textarea><label for="f5">Vaše vprašanje</label></div>
    <label class="check"><input type="checkbox" required><span>Strinjam se, da moje osebne podatke iz obrazca uporabite samo za odgovor na moje vprašanje. Več v <a href="varstvo-osebnih-podatkov.html">izjavi o varstvu osebnih podatkov</a>.</span></label>
    <button class="btn btn-cy" type="submit">Pošlji ${ARR}</button>
    <p class="sent">Hvala za vaše sporočilo! Odgovorili vam bomo v najkrajšem možnem času.</p>
  </form>
</div></section>
</main>` + footer();

/* ---------------- PRIVACY ---------------- */
const privacy = () => head('Varstvo osebnih podatkov · ZupO.si', 'Izjava o varstvu osebnih podatkov ZupO.si d.o.o.') + nav() + `
<main>
<section class="page-hero wrap"><div class="crumbs"><a href="index.html">Domov</a><span>/</span><span>Varstvo osebnih podatkov</span></div>
  <h1 class="d2">Izjava o varstvu<br>osebnih podatkov</h1>
  <p class="lead">ZupO.si d.o.o. se zaveda pomena varstva osebnih podatkov svojih uporabnikov in si prizadeva zagotavljati najvišje standarde zasebnosti.</p></section>
<section class="wrap" style="padding-bottom:clamp(90px,10vw,200px)"><div class="blocks">
  <div class="blk"><h2 class="h4">Upravljavec</h2><div class="body"><p>ZupO.si d.o.o., Zaboršt pri Dolu 11B, 1262 Dol pri Ljubljani, poslovna enota Ulica pod gozdom 6, 1236 Trzin. Vprašanja pošljite na info@zupo.si.</p></div></div>
  <div class="blk"><h2 class="h4">Kdaj obdelujemo podatke</h2><div class="body"><ul><li>Za sklenitev in izvajanje pogodbe</li><li>Ob zakonski zahtevi</li><li>Na podlagi legitimnega interesa</li><li>Na podlagi vaše privolitve</li></ul></div></div>
  <div class="blk"><h2 class="h4">Katere podatke zbiramo</h2><div class="body"><ul><li>Identifikacijske in kontaktne podatke</li><li>Podatke o uporabi naših storitev</li><li>Transakcijske podatke</li><li>Tehnične podatke ob obisku spletne strani (naslov IP, piškotki)</li></ul></div></div>
  <div class="blk"><h2 class="h4">Vaše pravice</h2><div class="body"><p>Imate pravico do dostopa, popravka, izbrisa, omejitve obdelave, prenosljivosti in ugovora. Zahteve pošljite na info@zupo.si ali po pošti na Ulica pod gozdom 6, 1236 Trzin. Podatkov brez soglasja ne posredujemo tretjim osebam, razen ob zakonskih obveznostih. Hranimo jih le toliko časa, kot je potrebno. Izjava velja od 30. 10. 2024.</p></div></div>
</div></section>
</main>` + footer();

const w = (f, html) => writeFileSync(new URL(f, OUT), html);
w('index.html', home());
services.forEach((s, i) => w(`${s.slug}.html`, servicePage(s, i)));
w('podjetje.html', podjetje());
w('p4d.html', p4d());
w('kontakt.html', kontakt());
w('varstvo-osebnih-podatkov.html', privacy());
console.log('built', 5 + services.length, 'pages');
