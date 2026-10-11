'use client';

import Link from 'next/link';
import { useRef } from 'react';
import Shell from '@/components/Shell';
import { Kicker, Manifesto } from '@/components/ui';
import { ArrowRight } from '@/components/icons';
import { img } from '@/lib/img';
import { num, pad, useLang } from '@/lib/lang';
import type { Motion } from '@/lib/motion';

const C = {
  en: {
    k: { conviction: '01 / Conviction', story: '02 / Story', work: '03 / Work', journey: '04 / Journey', impact: '05 / Impact', vision: '06 / Vision', ventures: '07 / Ventures', voice: '08 / Voice', field: '09 / In the field' },
    links: { story: 'Read my full story', journey: 'See the full journey', impact: 'See all impact', vision: 'More about me', ventures: 'Explore the ventures', voice: 'Press & honours', field: 'Open the gallery' },
    hero: {
      meta: ['Journalist', 'Media entrepreneur', 'Philanthropist'],
      l1: 'Badri Raj', l2: 'Timalsina', alt: 'बद्रिराज तिमल्सिना', scroll: 'Scroll',
      intro: 'Twenty-four years of journalism, service and enterprise, built in Nepal and for Nepal.',
      lede: 'I could have built a life abroad. I chose to stay, to report and to build, because I believe Nepal’s future is made at home.',
      cta1: 'Read my story', cta2: 'Get in touch', cap: 'Journalist · Kathmandu', imgAlt: 'Portrait of Badri Raj Timalsina',
    },
    manifesto: 'For over 24 years I have chosen journalism not for wealth, but for *honour*, *integrity* and the duty of being a true *watchdog* of society.',
    stats: [
      { n: 24, from: 0, suf: '+', l: 'Years in journalism' },
      { n: 8, from: 0, suf: '', l: 'Newspapers, radio stations and portals' },
      { n: 100, from: 0, suf: '+', l: 'People directly employed' },
      { n: 2015, from: 1990, suf: '', l: 'Philanthropy with Praramva since' },
    ],
    story: {
      quote: '“Leaving behind numerous opportunities abroad, I chose to build my career in my motherland.”',
      chapters: [
        { title: 'Where I come from', body: 'I was born in 1984 in Patlekhet, now part of Dhulikhel, the eldest son of a farming family. I decided to become a journalist when I was in class eight.', cap: 'In my early years' },
        { title: 'The stage before the page', body: 'Before journalism there was theatre. For almost five years I directed and acted in street and stage plays, and worked as an assistant director on films and documentaries. It taught me how a story reaches people.', cap: 'Speaking at a community programme' },
        { title: 'Honour over wealth', body: 'I came to journalism for honour, not money. A journalist’s first duty is to be a true watchdog of society, and I have tried to keep that duty through every newspaper, radio station and website I have worked on.', cap: 'Felicitated at the Federation of Nepali Journalists, Kavre' },
        { title: 'The choice to stay', body: 'I had opportunities to build a life abroad and turned them down. I wanted to use my experience and technology to give young people a reason, and a job, to stay in Nepal.', cap: 'At the Statue of Liberty, New York' },
        { title: 'Work at home', body: 'Self-reliance starts at home. Across my media houses, foundation work, garment business and hospitality ventures, more than 100 people now earn a steady monthly income.', cap: 'At work in Kathmandu' },
      ],
    },
    work: {
      title: 'Journalism, service and enterprise, for a self-reliant Nepal.',
      panels: [
        { title: 'Journalism', kicker: 'Print · Radio · Online', body: 'I started at Kavrepost Weekly and have spent more than two decades in print, radio and online news. Press freedom has been the one constant.', tags: ['Lahachhap.com', 'Best FM 88.1 MHz', 'FNJ Kavre · Past President'], link: 'Follow the journey', alt: 'Badri Raj Timalsina, garlanded at the president’s desk' },
        { title: 'Service', kicker: 'Praramva · Red Cross', body: 'As Project Director of Praramva and a Life Member of the Singapore Red Cross, I help rebuild schools and carry relief to communities the roads do not reach.', tags: ['Praramva · since 2015', 'Singapore Red Cross · since 2016'], link: 'See the impact', alt: 'Badri Raj Timalsina with students at a school programme' },
        { title: 'Enterprise', kicker: 'Media · Garments · Hospitality', body: 'Media houses, a garment business and a restaurant in Lazimpat. Together they give more than 100 people a steady monthly wage.', tags: ['Mike Restaurant & Bar', 'Guru Uniform Industry'], link: 'See the ventures', alt: 'Badri Raj Timalsina in a teal blazer' },
      ],
    },
    journey: {
      title: 'My journey, from Kavrepost to digital media.',
      lede: 'Nine stops across four decades: where I grew up, the stage, and the newspapers, radio stations and websites I have built.',
      endT: 'Every stop, in detail.',
      stations: [
        { yr: '1984', name: 'Patlekhet, Kavre', meta: 'Where it began', desc: 'Born the eldest son of a farming family, in what is now Dhulikhel.' },
        { yr: 'Stage', name: 'Theatre & film', meta: 'Before journalism', desc: 'Five years of street theatre, stage plays and assistant-director work on films and documentaries.' },
        { yr: '2001', name: 'Kavrepost Weekly', meta: 'Print · Kavre', desc: 'Where my journalism began.' },
        { yr: 'Print', name: 'Purba Darpan Daily', meta: 'Print', desc: 'The next step in print, on the pages of a daily.' },
        { yr: '2064 BS', name: 'Sanjibani Patra', meta: 'Print · Banepa', desc: 'Under my leadership the weekly became a daily. The market could not sustain it, but the attempt defined how I build media: without fear.' },
        { yr: 'Radio', name: 'Radio Madhya Purb FM', meta: 'Radio · Dhulikhel', desc: 'I established the radio station in Dhulikhel.' },
        { yr: 'Online', name: 'Ma Nepali & Digitalpatrika', meta: 'Print & online · Kathmandu', desc: 'I published Ma Nepali monthly and the Digitalpatrika portal independently from Kathmandu.' },
        { yr: 'Now', now: true, name: 'Lahachhap.com', meta: 'Online · Kathmandu', desc: 'I lead Lahachhap.com, an independent online news platform.' },
        { yr: 'Now', now: true, name: 'Best FM 88.1 MHz', meta: 'Radio · Banepa', desc: 'I founded and own the station, run with a dedicated team.' },
      ],
    },
    impact: {
      title: 'Service on the ground.',
      body: 'After the earthquake, Mangala Mai Secondary School in Piskar was rebuilt through Praramva with the Singapore Red Cross. It is one of many projects in education, health, skills and relief.',
      cap: 'With students at a school programme', credit: 'Praramva',
      facts: [
        { n: '2015', l: 'Praramva', d: 'A philanthropic organisation established in 2015. I serve as its Project Director.' },
        { n: '2016', l: 'Singapore Red Cross', d: 'Life Member, overseeing humanitarian and social-welfare schemes in Nepal.' },
        { n: '2077 BS', l: 'Chiwang, Solukhumbu', d: 'The Praramva Community Building, handed over to the community.' },
      ],
    },
    vision: {
      title: 'Committed to nation-building.', alt: 'Badri Raj Timalsina in front of the flag of Nepal',
      items: [
        { title: 'A prosperous society', body: 'A Nepal where every citizen is free to move, speak and live, and is also economically secure, educated, equal before the law, socially included and protected by the highest standards of human rights.' },
        { title: 'Good governance', body: 'Free health care and education, clean institutions and development without corruption.' },
        { title: 'Halting the youth exodus', body: 'Sovereignty, social harmony and an independent foreign policy. I am ready to take on wider social or political responsibility if it helps keep our young people at home.' },
      ],
    },
    ventures: {
      title: 'Building in Nepal, for Nepal.',
      lede: 'Across media, philanthropy and enterprise, these ventures give more than 100 people stable monthly work.',
      rows: [
        { group: 'Media', name: 'Lahachhap.com', role: 'Managing Director', meta: 'Digital news · Kathmandu' },
        { group: 'Media', name: 'Best FM 88.1 MHz', role: 'Founder & Owner', meta: 'Radio · Banepa' },
        { group: 'Philanthropy', name: 'Praramva', role: 'Project Director', meta: 'Since 2015 · Lalitpur' },
        { group: 'Philanthropy', name: 'Singapore Red Cross', role: 'Life Member', meta: 'Since 2016' },
        { group: 'Enterprise', name: 'Mike Restaurant & Bar', role: 'Director', meta: 'Hospitality · Lazimpat' },
        { group: 'Enterprise', name: 'Guru Uniform Industry', role: 'Founder & Chairman', meta: 'Garment manufacturing' },
      ],
    },
    voice: {
      title: 'Stepping forward as a public speaker.',
      body: 'My social work began at the grassroots. Now I speak through my own media platforms and, soon, a podcast, to connect hardworking Nepalis at home with successful Nepalis abroad.',
      cta: 'Invite me to speak', topicsK: 'I speak on',
      topics: ['Building a career at home, not abroad', 'Press freedom and the future of local media', 'Bringing successful Nepalis back home', 'Good governance and corruption-free development'],
      podTag: 'Podcast · coming soon', podT: 'A podcast connecting Nepalis at home and abroad.',
      podB: 'Realistic analysis, a positive mindset and the lessons life has taught me. Conversations for the next generation, and for Nepalis abroad who are thinking about coming home.',
      podAlt: 'Badri Raj Timalsina at the microphone',
    },
    field: { title: 'In the field.', alt: 'Badri Raj Timalsina in the field' },
  },
  ne: {
    k: { conviction: '०१ / अडान', story: '०२ / कथा', work: '०३ / काम', journey: '०४ / यात्रा', impact: '०५ / प्रभाव', vision: '०६ / दृष्टि', ventures: '०७ / उद्यम', voice: '०८ / आवाज', field: '०९ / मैदानमा' },
    links: { story: 'मेरो पूरा कथा पढ्नुहोस्', journey: 'पूरा यात्रा हेर्नुहोस्', impact: 'सबै प्रभाव हेर्नुहोस्', vision: 'मबारे थप', ventures: 'उद्यमहरू हेर्नुहोस्', voice: 'प्रेस र सम्मान', field: 'तस्बिर संग्रह खोल्नुहोस्' },
    hero: {
      meta: ['पत्रकार', 'सञ्चार उद्यमी', 'परोपकारी अभियन्ता'],
      l1: 'बद्रिराज', l2: 'तिमल्सिना', alt: 'Badri Raj Timalsina', scroll: 'स्क्रोल गर्नुहोस्',
      intro: 'पत्रकारिता, सेवा र उद्यमका चौबीस वर्ष, नेपालमै र नेपालका लागि।',
      lede: 'विदेशमा जीवन बनाउने अवसर मसँग थियो। तर मैले यहीँ बसेर समाचार लेख्ने र केही निर्माण गर्ने बाटो रोजेँ, किनकि नेपालको भविष्य घरमै बन्छ भन्ने मेरो विश्वास छ।',
      cta1: 'मेरो कथा पढ्नुहोस्', cta2: 'सम्पर्क गर्नुहोस्', cap: 'पत्रकार · काठमाडौं', imgAlt: 'बद्रिराज तिमल्सिनाको पोर्ट्रेट',
    },
    manifesto: 'विगत २४ वर्षभन्दा बढी समयदेखि मैले धनका लागि होइन, *सम्मान*, *निष्ठा* र समाजको सच्चा *प्रहरी* बन्ने कर्तव्यका लागि पत्रकारिता रोजेको छु।',
    stats: [
      { n: 24, from: 0, suf: '+', l: 'पत्रकारितामा वर्ष' },
      { n: 8, from: 0, suf: '', l: 'पत्रिका, रेडियो र पोर्टल' },
      { n: 100, from: 0, suf: '+', l: 'प्रत्यक्ष रोजगारी' },
      { n: 2015, from: 1990, suf: '', l: 'प्रारम्भमार्फत परोपकार, सन्' },
    ],
    story: {
      quote: '“विदेशका थुप्रै अवसर छाडेर मैले आफ्नो करियर मातृभूमिमै बनाउने निर्णय गरेँ।”',
      chapters: [
        { title: 'मेरो जरा', body: 'म सन् १९८४ मा पातलेखेत, हालको धुलिखेलमा एक किसान परिवारको जेठो छोराका रूपमा जन्मिएँ। कक्षा आठमै मैले पत्रकार बन्ने निधो गरेँ।', cap: 'सुरुवाती दिनमा' },
        { title: 'पानाअघिको मञ्च', body: 'पत्रकारिताअघि रंगमञ्च थियो। झन्डै पाँच वर्ष मैले सडक र मञ्च नाटकमा निर्देशन र अभिनय गरेँ, अनि चलचित्र र वृत्तचित्रमा सहायक निर्देशकका रूपमा काम गरेँ। कथा मानिससम्म कसरी पुग्छ भन्ने त्यहीँ सिकेँ।', cap: 'सामुदायिक कार्यक्रममा सम्बोधन गर्दै' },
        { title: 'धनभन्दा सम्मान', body: 'म पैसाका लागि होइन, सम्मानका लागि पत्रकारितामा आएँ। पत्रकारको पहिलो कर्तव्य समाजको सच्चा प्रहरी बन्नु हो, र मैले काम गरेका हरेक पत्रिका, रेडियो र वेबसाइटमा त्यही कर्तव्य निभाउने प्रयास गरेको छु।', cap: 'नेपाल पत्रकार महासंघ, काभ्रेमा सम्मानित' },
        { title: 'यहीँ बस्ने निर्णय', body: 'विदेशमा जीवन बनाउने अवसरहरू मैले अस्वीकार गरेँ। आफ्नो अनुभव र प्रविधिमार्फत युवालाई नेपालमै बस्ने कारण र रोजगारी दिन चाहन्थेँ।', cap: 'न्युयोर्कको स्ट्याच्यु अफ लिबर्टीमा' },
        { title: 'घरमै रोजगारी', body: 'आत्मनिर्भरता घरबाटै सुरु हुन्छ। मेरा सञ्चार गृह, संस्था, गार्मेन्ट उद्योग र आतिथ्य व्यवसायमार्फत अहिले १०० भन्दा बढी जनाले स्थिर मासिक आम्दानी गर्छन्।', cap: 'काठमाडौंमा कामका क्रममा' },
      ],
    },
    work: {
      title: 'आत्मनिर्भर नेपालका लागि पत्रकारिता, सेवा र उद्यम।',
      panels: [
        { title: 'पत्रकारिता', kicker: 'छापा · रेडियो · अनलाइन', body: 'काभ्रेपोस्ट साप्ताहिकबाट सुरु गरेर मैले दुई दशकभन्दा बढी छापा, रेडियो र अनलाइन समाचारमा बिताएँ। प्रेस स्वतन्त्रता सधैँ केन्द्रमा रह्यो।', tags: ['Lahachhap.com', 'बेस्ट एफएम ८८.१', 'महासंघ काभ्रे · पूर्व अध्यक्ष'], link: 'यात्रा हेर्नुहोस्', alt: 'अध्यक्षको कुर्सीमा माल्यार्पणसहित बद्रिराज तिमल्सिना' },
        { title: 'सेवा', kicker: 'प्रारम्भ · रेडक्रस', body: 'प्रारम्भको परियोजना निर्देशक र सिंगापुर रेडक्रसको आजीवन सदस्यका रूपमा म विद्यालय पुनर्निर्माण र सडक नपुगेका समुदायसम्म राहत पुर्‍याउने काममा छु।', tags: ['प्रारम्भ · २०१५ देखि', 'सिंगापुर रेडक्रस · २०१६ देखि'], link: 'प्रभाव हेर्नुहोस्', alt: 'विद्यालय कार्यक्रममा विद्यार्थीसँग बद्रिराज तिमल्सिना' },
        { title: 'उद्यम', kicker: 'सञ्चार · गार्मेन्ट · आतिथ्य', body: 'सञ्चार गृह, गार्मेन्ट व्यवसाय र लाजिम्पाटको रेस्टुरेन्ट। यी सबैले मिलेर १०० भन्दा बढी जनालाई स्थिर मासिक तलब दिन्छन्।', tags: ['माइक रेस्टुरेन्ट एन्ड बार', 'गुरु युनिफर्म उद्योग'], link: 'उद्यम हेर्नुहोस्', alt: 'टिल ब्लेजरमा बद्रिराज तिमल्सिना' },
      ],
    },
    journey: {
      title: 'मेरो यात्रा, काभ्रेपोस्टदेखि डिजिटल मिडियासम्म।',
      lede: 'चार दशकका नौ पडाव: हुर्केको ठाउँ, रंगमञ्च, र मैले निर्माण गरेका पत्रिका, रेडियो र वेबसाइट।',
      endT: 'हरेक पडाव, विस्तृतमा।',
      stations: [
        { yr: '१९८४', name: 'पातलेखेत, काभ्रे', meta: 'सुरुवात', desc: 'हालको धुलिखेलमा किसान परिवारको जेठो छोराका रूपमा जन्म।' },
        { yr: 'मञ्च', name: 'नाटक र चलचित्र', meta: 'पत्रकारिताअघि', desc: 'पाँच वर्ष सडक नाटक, मञ्च नाटक र चलचित्र तथा वृत्तचित्रमा सहायक निर्देशन।' },
        { yr: '२००१', name: 'काभ्रेपोस्ट साप्ताहिक', meta: 'छापा · काभ्रे', desc: 'जहाँबाट मेरो पत्रकारिता सुरु भयो।' },
        { yr: 'छापा', name: 'पूर्वदर्पण दैनिक', meta: 'छापा', desc: 'छापामा अर्को कदम, दैनिक पत्रिकाका पानामा।' },
        { yr: '२०६४', name: 'सञ्जीवनी पत्र', meta: 'छापा · बनेपा', desc: 'मेरो नेतृत्वमा साप्ताहिक दैनिक बन्यो। बजारले धान्न सकेन, तर त्यो प्रयासले मैले मिडिया कसरी बनाउँछु भन्ने परिभाषित गर्‍यो: निडर भएर।' },
        { yr: 'रेडियो', name: 'रेडियो मध्यपूर्व एफएम', meta: 'रेडियो · धुलिखेल', desc: 'धुलिखेलमा रेडियो स्टेसन स्थापना गरेँ।' },
        { yr: 'अनलाइन', name: 'म नेपाली र डिजिटलपत्रिका', meta: 'छापा र अनलाइन · काठमाडौं', desc: 'काठमाडौंबाट ‘म नेपाली’ मासिक र ‘डिजिटलपत्रिका’ पोर्टल स्वतन्त्र रूपमा प्रकाशन गरेँ।' },
        { yr: 'हाल', now: true, name: 'Lahachhap.com', meta: 'अनलाइन · काठमाडौं', desc: 'स्वतन्त्र अनलाइन समाचार मञ्च Lahachhap.com को नेतृत्व गर्दैछु।' },
        { yr: 'हाल', now: true, name: 'बेस्ट एफएम ८८.१', meta: 'रेडियो · बनेपा', desc: 'मैले स्थापना गरेको स्टेसन, समर्पित टोलीसँग सञ्चालनमा।' },
      ],
    },
    impact: {
      title: 'जमिनमै सेवा।',
      body: 'भूकम्पपछि पिस्करको मंगलामाई माध्यमिक विद्यालय सिंगापुर रेडक्रसको सहयोगमा प्रारम्भमार्फत पुनर्निर्माण भयो। शिक्षा, स्वास्थ्य, सीप र राहतका थुप्रै परियोजनामध्ये यो एक हो।',
      cap: 'विद्यालय कार्यक्रममा विद्यार्थीसँग', credit: 'प्रारम्भ',
      facts: [
        { n: '२०१५', l: 'प्रारम्भ', d: 'सन् २०१५ मा स्थापित परोपकारी संस्था, जहाँ म परियोजना निर्देशक छु।' },
        { n: '२०१६', l: 'सिंगापुर रेडक्रस', d: 'आजीवन सदस्य, नेपालमा मानवीय तथा समाज कल्याणका योजनाको निरीक्षण।' },
        { n: '२०७७', l: 'चिवाङ, सोलुखुम्बु', d: 'प्रारम्भ सामुदायिक भवन समुदायलाई हस्तान्तरण।' },
      ],
    },
    vision: {
      title: 'राष्ट्र निर्माणप्रति प्रतिबद्ध।', alt: 'नेपालको झण्डासामु बद्रिराज तिमल्सिना',
      items: [
        { title: 'समृद्ध समाज', body: 'यस्तो नेपाल जहाँ हरेक नागरिक हिँडडुल गर्न, बोल्न र बाँच्न स्वतन्त्र मात्र होइन, आर्थिक रूपमा समृद्ध, शिक्षित, कानुनको नजरमा समान, सामाजिक रूपमा समावेशी र मानव अधिकारको उच्चतम मापदण्डले सुरक्षित होस्।' },
        { title: 'सुशासन र विकास', body: 'निःशुल्क स्वास्थ्य र शिक्षा, सुशासन र भ्रष्टाचारमुक्त विकास।' },
        { title: 'युवा पलायन रोक्ने', body: 'राष्ट्रिय सार्वभौमसत्ता, सामाजिक सद्भाव र स्वतन्त्र विदेश नीति। युवालाई देशमै रोक्न सहयोग पुग्छ भने म थप सामाजिक वा राजनीतिक जिम्मेवारी लिन तयार छु।' },
      ],
    },
    ventures: {
      title: 'नेपालमा, नेपालका लागि।',
      lede: 'सञ्चार, परोपकार र उद्यममार्फत १०० भन्दा बढी जनालाई स्थिर मासिक रोजगारी।',
      rows: [
        { group: 'सञ्चार', name: 'Lahachhap.com', role: 'प्रबन्ध निर्देशक', meta: 'डिजिटल समाचार · काठमाडौं' },
        { group: 'सञ्चार', name: 'बेस्ट एफएम ८८.१', role: 'संस्थापक तथा सञ्चालक', meta: 'रेडियो · बनेपा' },
        { group: 'परोपकार', name: 'प्रारम्भ', role: 'परियोजना निर्देशक', meta: 'सन् २०१५ देखि · ललितपुर' },
        { group: 'परोपकार', name: 'सिंगापुर रेडक्रस', role: 'आजीवन सदस्य', meta: 'सन् २०१६ देखि' },
        { group: 'उद्यम', name: 'माइक रेस्टुरेन्ट एन्ड बार', role: 'निर्देशक', meta: 'आतिथ्य · लाजिम्पाट' },
        { group: 'उद्यम', name: 'गुरु युनिफर्म उद्योग', role: 'संस्थापक तथा अध्यक्ष', meta: 'गार्मेन्ट उत्पादन' },
      ],
    },
    voice: {
      title: 'सार्वजनिक वक्ताका रूपमा अगाडि।',
      body: 'मेरो सामाजिक यात्रा तल्लो तहबाट सुरु भयो। अब आफ्नै सञ्चार माध्यम र छिट्टै आउने पडकास्टमार्फत स्वदेशका मेहनती नागरिक र विदेशमा रहेका सफल नेपालीलाई जोड्न बोल्दैछु।',
      cta: 'वक्ताका रूपमा आमन्त्रण गर्नुहोस्', topicsK: 'मेरा विषयहरू',
      topics: ['विदेश होइन, स्वदेशमै करियर', 'प्रेस स्वतन्त्रता र स्थानीय मिडियाको भविष्य', 'सफल नेपालीलाई मातृभूमि फर्काउने', 'सुशासन र भ्रष्टाचारमुक्त विकास'],
      podTag: 'पडकास्ट · चाँडै आउँदै', podT: 'स्वदेश र विदेशका नेपालीलाई जोड्ने पडकास्ट।',
      podB: 'यथार्थपरक विश्लेषण, सकारात्मक सोच र जीवनले सिकाएका पाठ। नयाँ पुस्ता र स्वदेश फर्कने सोचमा रहेका विदेशका नेपालीहरूका लागि संवाद।',
      podAlt: 'माइक्रोफोनअगाडि बद्रिराज तिमल्सिना',
    },
    field: { title: 'मैदानमा।', alt: 'मैदानमा बद्रिराज तिमल्सिना' },
  },
};

const STORY_IMGS: [string, string][] = [
  ['badri/young-portrait', '32% 40%'],
  ['badri/community-meeting', '30% 40%'],
  ['badri/fnj-kavre', '50% 45%'],
  ['badri/statue-of-liberty', '50% 55%'],
  ['badri/portrait-office', '50% 30%'],
];
const PANEL_IMGS = ['badri/chairman-desk', 'badri/with-students', 'badri/portrait-teal'];
const PANEL_POS = ['50% 30%', '78% 40%', '50% 25%'];
const PANEL_HREF = ['/journey', '/impact', '/ventures'];
type Vis = { m: 'origin' | 'stage' | 'print' | 'radio' | 'online'; img?: string; pos?: string; c?: 'ink' | 'red' | 'tint' | 'surf' };
const STATION_VIS: Vis[] = [
  { m: 'origin', img: 'badri/early-years', pos: '50% 30%' },
  { m: 'stage', img: 'badri/early-stage', pos: '55% 30%' },
  { m: 'print', img: 'badri/early-portrait', pos: '50% 25%' },
  { m: 'print', c: 'surf' },
  { m: 'print', c: 'ink' },
  { m: 'radio', c: 'red' },
  { m: 'online', c: 'ink' },
  { m: 'online', img: 'badri/portrait-office', pos: '50% 30%' },
  { m: 'radio', img: 'badri/studio', pos: '50% 30%' },
];
const MEDIUM = {
  en: { origin: 'Origins', stage: 'Stage', print: 'Print', radio: 'Radio', online: 'Online' },
  ne: { origin: 'जरा', stage: 'रंगमञ्च', print: 'छापा', radio: 'रेडियो', online: 'अनलाइन' },
};
const PAL = {
  ink: ['var(--color-text)', 'var(--color-bg)'],
  red: ['var(--color-accent)', 'var(--color-bg)'],
  tint: ['var(--color-accent-100)', 'var(--color-accent-800)'],
  surf: ['var(--color-surface)', 'var(--color-text)'],
};
const VENTURE_PREVIEW = ['badri/portrait-office', 'badri/studio', 'badri/with-students', 'badri/chiwang-selfie', 'badri/portrait-teal', 'badri/portrait-coat'];
const FIELD: [string, string][] = [
  ['badri/with-students', '4/3'], ['badri/fnj-kavre', '4/5'], ['badri/early-community', '4/3'], ['badri/community-meeting', '4/5'],
  ['badri/chiwang-selfie', '4/3'], ['badri/chairman-desk', '4/5'], ['badri/statue-of-liberty', '4/5'], ['badri/dhaka-topi', '4/5'],
];

export default function HomePage() {
  const { lang } = useLang();
  const t = C[lang];
  const motion = useRef<Motion | null>(null);
  const p = (n: number) => pad(n, lang);

  return (
    <Shell page="home" motionRef={motion}>
      {/* 01 Hero */}
      <section id="top" data-hero="1" className="home-hero">
        <div className="home-hero__sticky">
          <div className="home-hero__grid">
            <div className="home-hero__left">
              <div data-hero-intro="1" className="home-hero__text stack">
                <div data-hero-fade="1" className="home-hero__meta">
                  {t.hero.meta.map((m) => <span key={m}>{m}</span>)}
                </div>
                <h1 className="display">
                  <span><span data-hero-line="1">{t.hero.l1}</span></span>
                  <span><span data-hero-line="1">{t.hero.l2}</span></span>
                </h1>
                <div data-hero-fade="1" lang={lang === 'ne' ? 'en' : 'ne'} style={{ marginTop: 'clamp(10px,2vh,20px)', fontSize: 'clamp(18px,1.7vw,24px)', fontWeight: 600 }}>{t.hero.alt}</div>
                <div className="home-hero__intro stack" style={{ marginTop: 'auto', gap: 20, paddingTop: 24 }}>
                  <p style={{ maxWidth: '30ch', fontSize: 'clamp(18px,1.6vw,24px)', fontWeight: 600, lineHeight: 1.4, textWrap: 'pretty' }}>{t.hero.intro}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                    <Link href="/about" className="btn btn-primary">{t.hero.cta1}</Link>
                    <span className="label" style={{ display: 'flex', alignItems: 'center', gap: 12 }} aria-hidden="true">
                      <span data-cue="1" style={{ width: 10, height: 10, background: 'var(--color-accent)', display: 'block' }} />{t.hero.scroll}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* 4:3 slot: before scrolling the photo fills it (object-fit: cover). On phones, and before the
                script runs, this is what you see. */}
            <div data-hero-slot="1" className="home-hero__photo">
              <img src={img('badri/hero-clean')} alt={t.hero.imgAlt} fetchPriority="high" width={1672} height={941} />
            </div>
          </div>
          {/* Desktop: starts as the slot's 4:3 cover crop; on scroll the trimmed sides open out while the photo
              grows, ending as the whole photo at full screen width. */}
          <div data-hero-reveal="1" className="home-hero__reveal" aria-hidden="true">
            <img src={img('badri/hero-clean')} alt="" width={1672} height={941} />
            {/* Darkens the open background on the left so the quote reads clearly; fades in with it. */}
            <div data-hero-scrim="1" className="home-hero__scrim" />
          </div>
          {/* Appears on the open background left of his head once the photo is full screen; placed by the motion engine. */}
          <div data-hero-panel="1" className="home-hero__panel">
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'calc(clamp(22px,2.3vw,34px) * var(--h-c))', lineHeight: 'var(--hl)', letterSpacing: '-.015em', textWrap: 'pretty' }}>{t.hero.lede}</p>
            <div className="btn-row">
              <Link href="/about" className="btn btn-light">{t.hero.cta1}</Link>
              <Link href="/contact" className="btn btn-ghost-light">{t.hero.cta2}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02 Conviction */}
      <section className="wrap" style={{ paddingTop: 'clamp(96px,16vh,200px)', paddingBottom: 'clamp(72px,12vh,140px)' }}>
        <div className="kicker">{t.k.conviction}</div>
        <Manifesto text={t.manifesto} style={{ margin: '32px 0 0 -.058em', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'calc(clamp(32px,5.6vw,96px) * var(--h-b))', lineHeight: 'var(--hl)', letterSpacing: '-.035em', maxWidth: '16em', textWrap: 'pretty' }} />
        <div className="cells cols-220" style={{ marginTop: 'clamp(64px,10vh,128px)' }}>
          {t.stats.map((s, i) => (
            <div key={i} style={{ padding: '28px 24px 32px' }}>
              <div data-reveal={i} className="stack" style={{ justifyContent: 'space-between', gap: 20, minHeight: 180 }}>
                <span data-count={s.n} data-from={s.from} data-suf={s.suf} className="stat">{num(s.n, lang) + s.suf}</span>
                <span className="label muted" style={{ maxWidth: '24ch' }}>{s.l}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 Story */}
      <section id="story" className="bt">
        <div className="wrap sec" style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px,6vw,112px)' }}>
          <div style={{ flex: '1 1 360px', minWidth: 0 }}>
            <div className="story-sticky stack" style={{ position: 'sticky', top: 'calc(var(--hh, 66px) + 32px)', gap: 12 }}>
              <div className="story-frame">
                {STORY_IMGS.map(([src, pos], i) => (
                  <div key={src} data-story-img="1" style={{ opacity: i === 0 ? 1 : 0 }}>
                    <img src={img(src, 'md')} alt={t.story.chapters[i].cap} loading="lazy" style={{ objectPosition: pos }} />
                  </div>
                ))}
              </div>
              <div className="muted" style={{ display: 'flex', justifyContent: 'space-between', gap: 16, fontSize: 13 }}>
                <span data-story-cap="1">{t.story.chapters[0].cap}</span>
                <span data-story-idx="1" className="tnum" style={{ fontWeight: 800, color: 'var(--color-text)', whiteSpace: 'nowrap' }}>{p(1)} / {p(5)}</span>
              </div>
            </div>
          </div>
          <div className="stack" style={{ flex: '1.25 1 440px', minWidth: 0 }}>
            <div className="kicker">{t.k.story}</div>
            <blockquote data-reveal="0" style={{ marginTop: 28, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'calc(clamp(30px,3.8vw,64px) * var(--h-c))', lineHeight: 'var(--hl)', letterSpacing: '-.03em', textWrap: 'pretty' }}>{t.story.quote}</blockquote>
            {t.story.chapters.map((c, i) => (
              <article key={i} data-chapter="1" data-cap={c.cap} className="story-chapter stack" style={{ minHeight: '58vh', justifyContent: 'center', gap: 18, borderTop: '2px solid var(--color-divider)', marginTop: 56, padding: '40px 0' }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
                  <span className="num" style={{ fontSize: 15 }}>{p(i + 1)}</span>
                  <h3 className="hl" style={{ fontSize: 'calc(clamp(28px,2.6vw,42px) * var(--h-c))', letterSpacing: '-.02em' }}>{c.title}</h3>
                </div>
                <p className="body-lg" style={{ fontSize: 'clamp(18px,1.45vw,22px)', lineHeight: 1.6, maxWidth: '42ch' }}>{c.body}</p>
              </article>
            ))}
            <Link href="/about" className="btn btn-secondary self-start" style={{ marginTop: 24 }}>{t.links.story}<ArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* 04 Work */}
      <section id="work" className="bt">
        <div className="wrap stack" style={{ paddingTop: 'clamp(80px,12vh,160px)', paddingBottom: 'clamp(40px,6vh,64px)', gap: 24 }}>
          <div className="kicker">{t.k.work}</div>
          <h2 className="headline" style={{ marginLeft: '-.058em', fontSize: 'calc(clamp(40px,6.4vw,112px) * var(--h-b))', maxWidth: '13em', textWrap: 'balance' }}>{t.work.title}</h2>
        </div>
        <div className="wrap sec-bot">
          {t.work.panels.map((pn, i) => (
            <div key={i} data-panel="1" className="panel" style={{ top: `calc(var(--hh, 66px) + ${i * 26}px)` }}>
              <div className="panel__inner">
                <div className="stack" style={{ gap: 20, minWidth: 0 }}>
                  <div className="label" style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                    <span className="tnum" style={{ color: 'var(--color-accent-700)' }}>{p(i + 1)} / {p(t.work.panels.length)}</span>
                    <span className="muted" style={{ textAlign: 'right' }}>{pn.kicker}</span>
                  </div>
                  <h3 className="display" style={{ marginTop: 8, fontSize: 'calc(clamp(52px,8vw,144px) * var(--h-b))' }}>{pn.title}</h3>
                  <p style={{ marginTop: 'auto', fontSize: 'clamp(18px,1.45vw,22px)', lineHeight: 1.6, maxWidth: '40ch', textWrap: 'pretty' }}>{pn.body}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {pn.tags.map((tg) => <span key={tg} className="tag">{tg}</span>)}
                  </div>
                  <Link href={PANEL_HREF[i]} className="btn btn-secondary self-start">{pn.link}<ArrowRight /></Link>
                </div>
                <div className="panel__media">
                  <img data-parallax="-0.08" className="px" src={img(PANEL_IMGS[i])} alt={pn.alt} loading="lazy" style={{ position: 'absolute', left: 0, top: '-10%', width: '100%', height: '120%', objectFit: 'cover', objectPosition: PANEL_POS[i] }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05 Journey (horizontal) */}
      <section id="journey" data-journey="1" className="journey bt">
        <div data-journey-sticky="1" className="journey__sticky">
          <div className="journey__head">
            <div className="stack" style={{ gap: 14, minWidth: 0 }}>
              <div className="kicker">{t.k.journey}</div>
              <h2 className="headline" style={{ fontSize: 'calc(clamp(28px,min(3.6vw,6.4vh),64px) * var(--h-c))', letterSpacing: '-.035em', maxWidth: '16em', textWrap: 'balance' }}>{t.journey.title}</h2>
              <p className="journey__lede" style={{ fontSize: 15, lineHeight: 1.5, maxWidth: '46ch', color: 'color-mix(in srgb,var(--color-text) 78%,transparent)' }}>{t.journey.lede}</p>
            </div>
            <div className="stack" style={{ alignItems: 'flex-end', gap: 6, minWidth: 0, textAlign: 'right' }}>
              <span data-jmeta="1" className="label" style={{ color: 'var(--color-accent-700)', minHeight: '1.2em' }}>{t.journey.stations[0].meta}</span>
              <div style={{ overflow: 'hidden', lineHeight: 0.86, padding: '.06em 0 .1em' }}>
                <span data-jyear="1" className="journey__year">{t.journey.stations[0].yr}</span>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, minHeight: 0, marginTop: 'clamp(16px,3vh,36px)', position: 'relative', overflow: 'hidden', borderTop: '2px solid var(--color-text)' }}>
            <div data-track="1" className="journey__track">
              {t.journey.stations.map((s, i) => {
                const v = STATION_VIS[i];
                const pal = PAL[v.c || 'surf'];
                const medium = MEDIUM[lang][v.m];
                const now = 'now' in s && s.now;
                return (
                  <article key={i} data-station="1" data-yr={s.yr} data-era={s.meta} className="station">
                    <div className="tnum" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontSize: 13, fontWeight: 800 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ width: 10, height: 10, background: now ? 'var(--color-accent)' : 'var(--color-text)', display: 'block' }} />
                        {p(i + 1)} / {p(t.journey.stations.length)}
                      </span>
                      <span className="tag" style={{ fontSize: 11, padding: '4px 8px', letterSpacing: '.06em', textTransform: 'uppercase' }}>{medium}</span>
                    </div>
                    <div data-jvis="1" className="station__vis" style={{ background: pal[0] }}>
                      {v.img ? (
                        <img src={img(v.img, 'md')} alt={s.name} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: v.pos }} />
                      ) : (
                        <div className="stack" style={{ position: 'absolute', inset: 0, padding: 'clamp(14px,1.6vw,24px)', justifyContent: 'space-between', color: pal[1] }}>
                          <span style={{ fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 600, opacity: 0.8 }}>{s.yr} · {s.meta}</span>
                          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'calc(clamp(44px,min(5vw,9vh),96px) * var(--h-b))', lineHeight: 0.9, letterSpacing: '-.05em' }}>{medium}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="hl" style={{ marginTop: 4, fontSize: 'clamp(20px,min(1.9vw,3.4vh),30px)', letterSpacing: '-.02em' }}>{s.name}</h3>
                    <p style={{ fontSize: 15, lineHeight: 1.5, maxWidth: '36ch', color: 'color-mix(in srgb,var(--color-text) 80%,transparent)', textWrap: 'pretty' }}>{s.desc}</p>
                  </article>
                );
              })}
              <article className="stack on-accent" style={{ flex: 'none', width: 'clamp(280px,29vw,460px)', height: '100%', justifyContent: 'flex-end', gap: 20, padding: 'clamp(20px,2.4vw,36px)' }}>
                <h3 className="hl" style={{ fontSize: 'calc(clamp(30px,3vw,52px) * var(--h-c))', letterSpacing: '-.035em' }}>{t.journey.endT}</h3>
                <Link href="/journey" className="btn btn-light self-start">{t.links.journey}<ArrowRight /></Link>
              </article>
            </div>
          </div>

          <div style={{ padding: 'clamp(12px,2vh,20px) var(--gut) 0' }}>
            <div className="journey__ticks" style={{ gridTemplateColumns: `repeat(${t.journey.stations.length},minmax(0,1fr))` }}>
              <span data-jmarker="1" style={{ position: 'absolute', top: -7, left: 0, width: 12, height: 12, marginLeft: -6, background: 'var(--color-accent)', display: 'block', zIndex: 1 }} />
              <span data-jbar="1" style={{ position: 'absolute', left: 0, right: 0, top: -2, height: 2, background: 'var(--color-text)', transformOrigin: '0 50%', transform: 'scaleX(0)', display: 'block' }} />
              {t.journey.stations.map((s, i) => <span key={i} data-jtick="1"><span />{s.yr}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* 06 Impact */}
      <section id="impact" className="bt">
        <div className="wrap grid-split end sec-top">
          <div className="stack" style={{ gap: 28 }}>
            <div className="kicker">{t.k.impact}</div>
            <h2 className="display" style={{ fontSize: 'calc(clamp(48px,8vw,148px) * var(--h-b))' }}>{t.impact.title}</h2>
          </div>
          <div className="stack" style={{ gap: 20 }}>
            <p style={{ maxWidth: '40ch', fontSize: 'clamp(18px,1.5vw,22px)', lineHeight: 1.55, textWrap: 'pretty' }}>{t.impact.body}</p>
            <Link href="/impact" className="btn btn-secondary self-start">{t.links.impact}<ArrowRight /></Link>
          </div>
        </div>
        <figure className="wrap" style={{ marginTop: 'clamp(48px,8vh,96px)' }}>
          <div data-wipe="1" className="media" style={{ aspectRatio: '2/1', clipPath: 'inset(0 100% 0 0)' }}>
            <img data-parallax="-0.06" className="px-sm" src={img('badri/with-students')} alt={t.impact.cap} loading="lazy" style={{ objectPosition: '50% 40%' }} />
          </div>
          <figcaption className="caption caption-row"><span>{t.impact.cap}</span><span>{t.impact.credit}</span></figcaption>
        </figure>
        <div className="wrap sec-bot" style={{ marginTop: 'clamp(56px,9vh,112px)' }}>
          <div className="cells cols-260">
            {t.impact.facts.map((f, i) => (
              <div key={i} style={{ padding: '28px 24px 36px' }}>
                <div data-reveal={i} className="stack" style={{ gap: 12, minHeight: 200 }}>
                  <span className="stat" style={{ fontSize: 'calc(clamp(48px,5vw,88px) * var(--h-b))' }}>{f.n}</span>
                  <span className="label" style={{ marginTop: 'auto' }}>{f.l}</span>
                  <span style={{ fontSize: 16, lineHeight: 1.55, color: 'color-mix(in srgb,var(--color-text) 82%,transparent)', maxWidth: '34ch' }}>{f.d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 Vision */}
      <section id="vision" className="on-accent">
        <div className="wrap" style={{ paddingTop: 'clamp(96px,14vh,180px)', paddingBottom: 'clamp(96px,14vh,180px)' }}>
          <div className="grid-split end" style={{ gap: '40px clamp(32px,6vw,112px)', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))' }}>
            <div className="stack" style={{ gap: 28 }}>
              <div className="kicker">{t.k.vision}</div>
              <h2 className="display" style={{ fontSize: 'calc(clamp(48px,7.4vw,140px) * var(--h-b))', maxWidth: '11em' }}>{t.vision.title}</h2>
            </div>
            <figure className="stack" style={{ gap: 10, maxWidth: 440, width: '100%', justifySelf: 'end' }}>
              <div className="media" style={{ aspectRatio: '4/5', background: '#fff' }}>
                <img data-parallax="-0.06" className="px-sm" src={img('badri/nepal-flag', 'md')} alt={t.vision.alt} loading="lazy" style={{ objectPosition: '50% 20%' }} />
              </div>
            </figure>
          </div>
          <div className="stack" style={{ marginTop: 'clamp(56px,9vh,112px)' }}>
            {t.vision.items.map((v, i) => (
              <div key={i} data-reveal="0" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: '20px clamp(24px,4vw,72px)', padding: '36px 0 44px', borderTop: '2px solid color-mix(in srgb,var(--color-bg) 35%,transparent)', alignItems: 'baseline' }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'baseline' }}>
                  <span className="num" style={{ fontSize: 15 }}>{p(i + 1)}</span>
                  <h3 className="hl" style={{ fontSize: 'calc(clamp(28px,3.2vw,52px) * var(--h-c))', letterSpacing: '-.03em' }}>{v.title}</h3>
                </div>
                <p className="body-md" style={{ maxWidth: '52ch' }}>{v.body}</p>
              </div>
            ))}
          </div>
          <Link href="/about" className="btn btn-ghost-light" style={{ marginTop: 24 }}>{t.links.vision}<ArrowRight /></Link>
        </div>
      </section>

      {/* 08 Ventures */}
      <section id="ventures" className="sec">
        <div className="wrap">
          <div className="grid-split grid-split--380 end" style={{ gap: '24px clamp(32px,6vw,112px)' }}>
            <div className="stack" style={{ gap: 24 }}>
              <div className="kicker">{t.k.ventures}</div>
              <h2 className="headline" style={{ marginLeft: '-.058em', fontSize: 'calc(clamp(40px,6.4vw,112px) * var(--h-b))' }}>{t.ventures.title}</h2>
            </div>
            <div className="stack" style={{ gap: 20 }}>
              <p className="body-md" style={{ fontSize: 'clamp(18px,1.4vw,21px)' }}>{t.ventures.lede}</p>
              <Link href="/ventures" className="btn btn-secondary self-start">{t.links.ventures}<ArrowRight /></Link>
            </div>
          </div>
          <div data-reveal="0" onMouseMove={(e) => motion.current?.onMove(e)} onMouseLeave={() => motion.current?.onLeave()} className="bt-ink" style={{ marginTop: 'clamp(48px,8vh,96px)' }}>
            {t.ventures.rows.map((v, i) => {
              const src = VENTURE_PREVIEW[i];
              return (
                <Link key={i} href="/ventures" className="hover-row bb" onMouseEnter={() => motion.current?.showPreview(src ? img(src, 'md') : null)}
                  style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px clamp(16px,2.4vw,40px)', padding: 'clamp(20px,2.6vw,36px) 0', color: 'var(--color-text)', textDecoration: 'none' }}>
                  <span className="num" style={{ flex: '0 0 44px' }}>{p(i + 1)}</span>
                  <span className="hl" style={{ flex: '1 1 320px', minWidth: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'calc(clamp(28px,3.6vw,60px) * var(--h-c))', letterSpacing: '-.035em' }}>{v.name}</span>
                  <span className="stack" style={{ flex: '1 1 220px', minWidth: 0, gap: 4 }}>
                    <span style={{ fontSize: 17, fontWeight: 600 }}>{v.role}</span>
                    <span className="muted" style={{ fontSize: 13, letterSpacing: '.06em', textTransform: 'uppercase' }}>{v.group} · {v.meta}</span>
                  </span>
                  <ArrowRight size={22} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 09 Voice */}
      <section id="voice" className="bt">
        <div className="wrap sec grid-split" style={{ gap: '48px clamp(40px,6vw,112px)' }}>
          <div className="stack" style={{ gap: 24 }}>
            <div className="kicker">{t.k.voice}</div>
            <h2 className="headline" style={{ marginLeft: '-.058em', fontSize: 'calc(clamp(40px,5.6vw,96px) * var(--h-b))' }}>{t.voice.title}</h2>
            <p className="body-md" style={{ fontSize: 'clamp(18px,1.4vw,21px)', maxWidth: '46ch' }}>{t.voice.body}</p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn-primary">{t.voice.cta}</Link>
              <Link href="/press" className="btn btn-secondary">{t.links.voice}</Link>
            </div>
          </div>
          <div className="stack" style={{ alignSelf: 'end' }}>
            <div className="label muted" style={{ paddingBottom: 16 }}>{t.voice.topicsK}</div>
            {t.voice.topics.map((x, i) => (
              <div key={i} data-reveal={i} className="row-item">
                <span className="num">{p(i + 1)}</span>
                <span className="row-item__text">{x}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="wrap sec-bot">
          <div className="grid-split" style={{ gap: 0, borderTop: '2px solid var(--color-text)', borderBottom: '2px solid var(--color-text)' }}>
            <div className="media" style={{ minHeight: 'clamp(320px,40vw,560px)' }}>
              <img data-parallax="-0.1" className="px" src={img('badri/studio')} alt={t.voice.podAlt} loading="lazy" style={{ objectPosition: '50% 30%' }} />
            </div>
            <div className="stack" style={{ padding: 'clamp(28px,4vw,64px)', gap: 24, justifyContent: 'center' }}>
              <div className="label" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--color-accent-700)' }}>
                <span data-onair="1" style={{ width: 10, height: 10, background: 'var(--color-accent)', display: 'block' }} />{t.voice.podTag}
              </div>
              <h3 className="hl" style={{ fontSize: 'calc(clamp(32px,3.8vw,64px) * var(--h-c))', letterSpacing: '-.035em' }}>{t.voice.podT}</h3>
              <p className="body-md">{t.voice.podB}</p>
              <Link href="/journal#podcast" className="btn btn-secondary self-start">{lang === 'ne' ? 'जानकारी पाउनुहोस्' : 'Get notified'}<ArrowRight /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10 In the field */}
      <section id="field" className="bt sec" style={{ overflow: 'hidden' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div className="stack" style={{ gap: 24 }}>
            <div className="kicker">{t.k.field}</div>
            <h2 className="display" style={{ fontSize: 'calc(clamp(48px,8vw,148px) * var(--h-b))' }}>{t.field.title}</h2>
          </div>
          <Link href="/gallery" className="btn btn-secondary">{t.links.field}<ArrowRight /></Link>
        </div>
        <div style={{ marginTop: 'clamp(40px,7vh,80px)' }}>
          <div data-drift="0.5" className="drift-row" style={{ marginLeft: '-14vw' }}>
            {FIELD.map(([src, ar]) => (
              <div key={src} className="media" style={{ flex: 'none', width: 'clamp(240px,26vw,440px)', aspectRatio: ar }}>
                <img src={img(src, 'md')} alt={t.field.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div data-preview="1" aria-hidden="true" className="preview"><img data-preview-img="1" alt="" /></div>
    </Shell>
  );
}
