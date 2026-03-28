/**
 * 100 demo prijava na hrvatskom — naslovi i opisi za seed (Zagreb).
 * imageUrl koristi picsum.photos (stabilan seed po indeksu).
 */

import { IssueCategory, IssueStatus, Prisma } from "@prisma/client";

const STREETS = [
  "Ilica 14, Zagreb",
  "Savska cesta 32, Zagreb",
  "Vukovarska avenija 100, Zagreb",
  "Heinzelova 33, Zagreb",
  "Slavonska avenija 11, Zagreb",
  "Tkalčićeva 8, Zagreb",
  "Martićeva 21, Zagreb",
  "Vlaška 45, Zagreb",
  "Frankopanska 9, Zagreb",
  "Miramarska 23, Zagreb",
  "Dubrava, Avenija Većeslava Holjevca, Zagreb",
  "Jarunska 2, Zagreb",
  "Horvaćanska cesta 60, Zagreb",
  "Zagrebačka avenija 96, Zagreb",
  "Ulica grada Vukovara 226, Zagreb",
  "Draškovićeva 19, Zagreb",
  "Petrova 71, Zagreb",
  "Šubićeva 40, Zagreb",
  "Trnjanska cesta 108, Zagreb",
  "Zavrtnica 17, Zagreb",
  "Borongajska cesta 44, Zagreb",
  "Selska cesta 90, Zagreb",
  "Kačićeva 15, Zagreb",
  "Prečko, Ulica kneza Branimira, Zagreb",
  "Stenjevec, Ilica 404, Zagreb",
  "Dolje, Savska opatovina, Zagreb",
  "Peščenica, Radnička cesta 53, Zagreb",
  "Trnje, Hrelićka 12, Zagreb",
  "Maksimir, Maksimirska 18, Zagreb",
  "Remetinec, Remetinečka cesta 7, Zagreb",
];

/** Širi Zagreb (grad + okolica) — uniformno raspoređene točke, ne u mreži */
const ZAGREB_BOUNDS = {
  minLat: 45.72,
  maxLat: 45.88,
  minLng: 15.82,
  maxLng: 16.08,
} as const;

/** Deterministički RNG za ponovljiv seed (isti rezultat pri svakom `db seed`) */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildScatteredZagrebPoints(
  count: number,
  seed: number,
): { lat: number; lng: number }[] {
  const rng = mulberry32(seed);
  const { minLat, maxLat, minLng, maxLng } = ZAGREB_BOUNDS;
  const pts: { lat: number; lng: number }[] = [];
  for (let i = 0; i < count; i++) {
    pts.push({
      lat: minLat + rng() * (maxLat - minLat),
      lng: minLng + rng() * (maxLng - minLng),
    });
  }
  return pts;
}

/** Fisher–Yates permutacija [0..n-1] — miješa redoslijed bez kategorijskih traka */
function shuffledIndices(n: number, seed: number): number[] {
  const rng = mulberry32(seed);
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

type Row = {
  title: string;
  description: string;
  category: IssueCategory;
  customCategory: string | null;
};

const ROWS: Row[] = [
  // PROMET (25)
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Velika rupa u asfaltu",
    description:
      "Na križanju se otvara rupa promjera oko 40 cm, duboka više od 10 cm. Noću je gotovo nevidljiva — već su oštećena dva auta. Molimo privremeno označiti i zaasfaltirati.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Oštećen poklopac kanalizacijskog šahta",
    description:
      "Metalni poklopac je pukao na pola i klizi kad se pređe vozilom. Opasno za bicikliste i motocikliste. Potrebna zamjena poklopca.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Uklonjena horizontalna signalizacija",
    description:
      "Bijele linije na pješačkom prijelazu gotovo su potpuno izlizane od kiše i prometa. Vozači ne vide gdje stati. Treba ponovno farbanje.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Nesiguran završetak biciklističke staze",
    description:
      "Staza naglo završava u travi bez oznake. Biciklisti ulaze u promet bez upozorenja. Predlažem stupiće ili oznake na kolniku.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Oštećena zaštitna ograda na mostu",
    description:
      "Čelična ograda je korodirala i pomiče se kad se pritisne. Sigurnosni rizik za pješake, posebno djecu.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Zagušen odvod kišnice",
    description:
      "Kišna voda stoji u dubokoj lokvi jer su rešetke pune lišća i zemlje. Zimi led — sklizak kolnik.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Puknut trotoar uz školu",
    description:
      "Betonske ploče su podignute — rizik od spoticanja u jutarnjim satima kad je gužva roditelja i djece.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Neispravan semafor za pješake",
    description:
      "Zeleno svjetlo treperi i ponekad uopće ne svijetli. Pješaci prelaze na vlastiti rizik.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Otpalo prometno ogledalo",
    description:
      "Kružni tok: konveksno ogledalo visi na jednoj žici, trebalo bi biti učvršćeno na stup.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Oštećena ulica od radova",
    description:
      "Nakon iskopa kanala asfalt je nasut šljunkom ali nije završen — nastaje prašina i rupa.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Neoznačena radna zona",
    description:
      "Stoje betonske barijere bez lampi i znakova noću. Vidljivost slaba.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Klizav kolnik zbog ulja",
    description:
      "Dugačka mrlja od motornog ulja na usponu. Više sklizaka u kiši.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Oštećen rubnik",
    description:
      "Rubnik je odvaljen — voda curi u podrum susjedne zgrade kad jako pada kiša.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Nedostaje znak „uspori”",
    description:
      "U blizini dječjeg vrtića nema upozorenja. Vozači voze brzo.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Rupa uz tramvajske šine",
    description:
      "Asfalt oko šina je raspukao — buka i vibracije u stanovima.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Oštećena zaustavna traka za autobus",
    description:
      "Betonska traka je pukla — autobusi se ljuljaju pri polasku.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Neprohodan pješački podvožnjak",
    description:
      "U podvožnjaku je razbijeno svjetlo i vidljiv grafit — građani izbjegavaju prolaz.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Oštećena nadvožnjak ograda",
    description:
      "Čelična mreža je odrezana — opasnost od pada predmeta na kolnik.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Zagušen kružni tok",
    description:
      "U špici se formira duga kolona jer nema jasne oznake traka.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Oštećena rampa za invalide",
    description:
      "Nagib rampe je prestrm i klizav u kiši — invalidska kolica ne mogu sigurno.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Pukla ploča na mostu",
    description:
      "Čuje se šuštanje kad kamioni pređu — potrebna inspekcija nosivosti.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Neispravna rasvjeta tunela",
    description:
      "Svjetiljke naizmjenično gore — slab vid u tunelu.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Oštećena zaštitna ograda uz cestu",
    description:
      "Guardrail je deformiran nakon sudara — nije vraćen u prvobitno stanje.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Blato na cesti nakon gradilišta",
    description:
      "Kamioni izvode blato na kolnik — vidljivost smanjena, vozila prljava.",
  },
  {
    category: IssueCategory.PROMET,
    customCategory: null,
    title: "Pješački prijelaz bez taktilne staze",
    description:
      "Slijepi građani nemaju taktilne trake do prijelaza.",
  },
  // KOMUNALNI (25)
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Pukla glavna vodovodna cijev",
    description:
      "Voda curi iz šahta i stvara lokvu. Pritisak u zgradama pao. Hitna intervencija vodovoda potrebna.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Puknuće kanalizacije u dvorištu",
    description:
      "Miris je nepodnošljiv, vlaga u podrumu. Kanalizacija vjerojatno začepljena ili pukla.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Neispravan javni vodeni ventil",
    description:
      "Ventil curi stalno — gubitak vode i klizak trotoar zimi.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Oštećena kućišta vodomjera",
    description:
      "Poklopac je otvoren — moguć neovlašteni pristup i prljavština.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Pukla cijev grijanja u šahtu",
    description:
      "Para izlazi iz šahta, asfalt se grije. Toplana bi trebala provjeriti.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Neispravna javna česma",
    description:
      "Česma curi cijeli dan — potrošnja vode i led zimi.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Začepljeni oluci na zgradi",
    description:
      "Kišnica curi preko fasade — vlagu osjetiti u stanovima.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Pukla cijev plina — miris",
    description:
      "U blizini šahta osjeti se plin. Molimo hitnu provjeru i označavanje.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Oštećena električna razvodna kutija",
    description:
      "Vrata kutije su otvorena, vidljive žice — opasnost od udara.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Neispravna ulična rasvjeta",
    description:
      "Stub lampe je nakrivljen, svjetiljka ne radi mjesecima.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Pukla cijev odvoda kišnice",
    description:
      "Kišnica se ne odvodi u kanal nego u dvorište.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Oštećen hidrant",
    description:
      "Hidrant curi lagano — ventil ne drži do kraja.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Pukla cijev u podrumu zgrade",
    description:
      "Stanari prijavljuju vlagu i kapljice stropa — potrebna inspekcija vertikale.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Neispravan lift u zgradi — javni pristup",
    description:
      "Zgrada ima poslovni prostor u prizemlju, lift ne radi — invalidi ne mogu ući.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Oštećena šaht poklopac — buka",
    description:
      "Kad pređe auto, poklopac udara — buka noću.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Pukla toplovodna cijev ispod ceste",
    description:
      "Asfalt se podiže, osjeti se toplina — moguće curenje.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Neispravan javni WC",
    description:
      "Zatvoren javni WC u parku — potreban popravak ili čišćenje.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Oštećena kišna kanalizacija",
    description:
      "Šaht pun smeća — kiša plavi trotoar.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Pukla cijev za navodnjavanje",
    description:
      "U parku stalno curi voda iz podzemne instalacije.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Neispravan senzor rasvjete",
    description:
      "Svjetla u podvožnjaku rade 24/7 — ne reagira na dan.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Oštećena kanalizacijska pumpna stanica",
    description:
      "Čuje se neobičan zvuk i miris — potrebna kontrola.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Pukla cijev za tehničku vodu",
    description:
      "Voda curi na zemljište gradilišta i u susjedno dvorište.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Neispravan javni kiosk / informativni panel",
    description:
      "Elektronički panel ne radi — građani nemaju raspored.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Oštećena cijev optike",
    description:
      "Radovi su oštetili poklopac šahta s optikom — rizik za infrastrukturu.",
  },
  {
    category: IssueCategory.KOMUNALNI,
    customCategory: null,
    title: "Pukla odvodna cijev u kući",
    description:
      "Fekalije se vraćaju u kupaonicu — hitno potrebna čišćenje glavnog odvoda.",
  },
  // OKOLIŠ (25)
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Neispravni kontejneri za plastiku",
    description:
      "Poklopci su polomljeni, otpad vjetar raznosi po parku. Treba zamjena kontejnera.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Gomila građevinskog otpada",
    description:
      "U zelenoj zoni ostavljeni beton i keramika — ilegalno odlaganje.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Oštećena dječja igrališta — otpad",
    description:
      "Ispod ljuljačke su oštri predmeti i staklo — opasno za djecu.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Neodržavana zelena površina",
    description:
      "Trava visoka pola metra, puno krpelja — ne može se sigurno koristiti park.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Zagađen potok",
    description:
      "Voda je mutna, pluta pjena — sumnja na ispust iz nekog dvorišta.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Posječeno drvo bez dozvole",
    description:
      "U parku su pali stabla, ostaci su ostavljeni na mjestu.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Nedostaje kanta za pasji otpad",
    description:
      "Vlasnici pasa ostavljaju vrećice uz stabla — nehigijenski.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Oštećena klupa u parku",
    description:
      "Daske su polomljene — klupa se ne može koristiti.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Grafiti na spomeniku",
    description:
      "Potrebno čišćenje i zaštita površine.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Neispravna fontana u parku",
    description:
      "Voda ne radi, stoji mutna u bazenu — leglo komaraca.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Otpad od rezanja trave",
    description:
      "Bačen uz rub staze, smrdi i privlači insekte.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Oštećena ograda parka",
    description:
      "Puknuta žica — psi ulaze u promet.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Zapuštena cvjetna alegorija",
    description:
      "Cvijeće uvenulo, korovi preuzeli — treba održavanje.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Neispravne solarne kante",
    description:
      "Kompaktori ne rade — otpad prekoračuje kapacitet.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Oštećene pločnike u parku",
    description:
      "Korijenje drveta podiglo ploče — spoticanje.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Bučna terasa noću",
    description:
      "Glasna glazba iz lokala do 2h — narušen mir susjedstva (buka u zelenoj zoni).",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Otpad od građevine u šumi",
    description:
      "Vreće cementa i ploče ostavljene uz stazu.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Neispravna navodnjavanje trave",
    description:
      "Prskalice cure — rasipanje vode i blato.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Oštećena ptičja kućica u parku",
    description:
      "Drvo puklo, kućica visi — opasnost od pada.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Zagađen zrak od dima",
    description:
      "Paljenje lišća u dvorištima uz školu — dim ulazi u učionice.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Oštećena staza kroz park",
    description:
      "Asfalt je raspukao — voda stoji u lokvama.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Neodržavani živi plot",
    description:
      "Grmlje narastlo preko staze — neprohodno za kolica.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Otpad od ambalaže uz kontejnere",
    description:
      "Kontejner prepun — otpad oko njega.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Oštećena dječja penjalica",
    description:
      "Užad je istrošena — potrebna zamjena dijelova.",
  },
  {
    category: IssueCategory.OKOLIS,
    customCategory: null,
    title: "Zapuštena livada uz stambenu zonu",
    description:
      "Korovi i smeće — potrebno košenje i odvoz.",
  },
  // OSTALO (25) — customCategory
  {
    category: IssueCategory.OSTALO,
    customCategory: "Buka",
    title: "Buka od klimatskih jedinica",
    description:
      "Spoljni motori na zgradi rade noću ispred spavaćih soba. Molimo provjeru propisa o radu uređaja.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Grafiti",
    title: "Grafiti na podvožnjaku",
    description:
      "Nedavno očišćen zid ponovno iscrtan — potrebna zaštita ili nadzor.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Najam stanova",
    title: "Nelegalni smještaj turista",
    description:
      "Stalna promjena stanara, buka od kofera u noćnim satima — sumnja na kratkoročni najam bez prijave.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Pristup",
    title: "Nedostatak rampe za invalidska kolica",
    description:
      "Javna ustanova ima stepenice bez alternative — teško ulazak.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Psi",
    title: "Nesređeni psi na ulici",
    description:
      "Često se viđaju psi bez povodnika u parku — strah od ugriza.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Osvjetljenje",
    title: "Prejaka reklama LED",
    description:
      "LED panel bljeska u spavaću sobu stanara preko puta — smetnja.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Mir",
    title: "Radovi u nedozvoljenim satima",
    description:
      "Bušenje u subotu ujutro prije 8h — narušen mir.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Parking",
    title: "Nepropisno parkiranje na travi",
    description:
      "Auta gaze travu u parku jer nema mjesta — uništava se zelenilo.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Sigurnost",
    title: "Prazna lokacija bez nadzora",
    description:
      "Razbijena stakla u praznoj zgradi — privlači beskućnike.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Zdravlje",
    title: "Odbačeni špricevi u parku",
    description:
      "Pronađeni predmeti u grmlju — potrebno čišćenje i edukacija.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Komunalno",
    title: "Neispravan javni Wi-Fi panel",
    description:
      "Panel piše „uskoro” već godinu dana — ne radi.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Pristup",
    title: "Nedostatak oznaka za slijepe",
    description:
      "Na križanju nema taktilnih oznaka prema uputama.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Buka",
    title: "Teretni lift noću",
    description:
      "Dizalica na gradilištu radi do kasno — buka u stanovima.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Čistoća",
    title: "Nečišćen podzemni prolaz",
    description:
      "U podvožnjaku su smeće i miris — potrebno čišćenje.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Promet",
    title: "Neoznačeno mjesto za dostavu",
    description:
      "Kamioni zaustavljaju promet jer nema trake za istovar.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Zgrade",
    title: "Otpadanje fasade",
    description:
      "Komadi žbuke padaju na trotoar — opasnost za pješake.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Park",
    title: "Nedostaje hlad u parku",
    description:
      "Nema dovoljno sjenke — trebalo bi više stabala ili sjenica.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Voda",
    title: "Neispravan javni izvor vode",
    description:
      "Česma ne da vodu — građani u šetnji nemaju piće.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Informacije",
    title: "Zastarjela karta na tabli",
    description:
      "Informacijska ploča u parku pokazuje stare podatke o događajima.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Buka",
    title: "Klubska glazba do kasno",
    description:
      "Bas se čuje u stanovima do 3h ujutro — žalbe stanara.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Pristup",
    title: "Uski prolaz za hitna vozila",
    description:
      "U ulici je parkiranje s obje strane — sumnja da vatrogasno može proći.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Čistoća",
    title: "Nedostatak kante za žvakaće",
    description:
      "Žvakaće su na asfaltu ispred trgovačkog centra.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Sigurnost",
    title: "Puklo staklo na autobusnoj nadstrešnici",
    description:
      "Staklo je puklo — opasnost od pada.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Zelenilo",
    title: "Suha stabla uz cestu",
    description:
      "Mrtva stabla bi trebala ukloniti prije oluje.",
  },
  {
    category: IssueCategory.OSTALO,
    customCategory: "Komunalno",
    title: "Neispravan bankomat u zatvorenom prolazu",
    description:
      "Bankomat ne radi mjesecima — prljava površina oko njega.",
  },
];

export function buildDummyIssueData(
  authorId: string,
): Prisma.IssueCreateManyInput[] {
  if (ROWS.length !== 100) {
    throw new Error(`Očekuje se 100 redaka, ima ${ROWS.length}`);
  }

  const coords = buildScatteredZagrebPoints(100, 202403281);
  const coordOrder = shuffledIndices(100, 202403282);
  const streetOrder = shuffledIndices(100, 202403283);

  const out: Prisma.IssueCreateManyInput[] = [];

  for (let i = 0; i < 100; i++) {
    const row = ROWS[i]!;
    const { lat, lng } = coords[coordOrder[i]!]!;
    const street = STREETS[streetOrder[i]! % STREETS.length]!;
    const upvoteCount = (i * 7 + 13) % 87;
    const resolveCount = (i * 3) % 12;
    const status =
      i % 17 === 0
        ? IssueStatus.RESOLVED
        : i % 23 === 0
          ? IssueStatus.SENT_TO_HOLDING
          : IssueStatus.SUBMITTED;

    const imageUrl = `https://picsum.photos/seed/fikseraj-demo-${i}/1024/768`;

    const desc = `${row.description}\n\n📍 ${street}\n(Demo podatak za testiranje karte — Fikseraj.)`;

    out.push({
      title: `[DEMO] ${row.title}`,
      description: desc.slice(0, 500),
      category: row.category,
      customCategory:
        row.category === IssueCategory.OSTALO ? row.customCategory : null,
      lat,
      lng,
      addressText: street,
      status,
      upvoteCount,
      resolveCount,
      imageUrl,
      sentToHoldingEmail: status === IssueStatus.SENT_TO_HOLDING,
      authorId,
    });
  }

  return out;
}
