import React, { useState, useEffect, useCallback } from 'react';

// --- Data: Reworked with specific sentences for each tense and their English translations ---
const allVerbs = [
    { infinitief: 'aanbieden', imperfectum: 'bood aan, boden aan', perfectum: 'heeft aangeboden', english: 'to offer', sentence_inf: 'Ik zal je een drankje aanbieden.', sentence_inf_en: 'I will offer you a drink.', sentence_imp: 'Hij bood mij een kopje koffie aan.', sentence_imp_en: 'He offered me a cup of coffee.', sentence_perf: 'Zij heeft hem een baan aangeboden.', sentence_perf_en: 'She has offered him a job.' },
    { infinitief: 'aandoen', imperfectum: 'deed aan, deden aan', perfectum: 'heeft aangedaan', english: 'to put on, turn on', sentence_inf: 'Je moet een warme jas aandoen.', sentence_inf_en: 'You must put on a warm coat.', sentence_imp: 'Ik deed het licht aan.', sentence_imp_en: 'I turned on the light.', sentence_perf: 'Ze heeft haar nieuwe schoenen aangedaan.', sentence_perf_en: 'She has put on her new shoes.' },
    { infinitief: 'aankomen', imperfectum: 'kwam aan, kwamen aan', perfectum: 'is aangekomen', english: 'to arrive', sentence_inf: 'De trein zal op tijd aankomen.', sentence_inf_en: 'The train will arrive on time.', sentence_imp: 'Hij kwam gisteren in Amsterdam aan.', sentence_imp_en: 'He arrived in Amsterdam yesterday.', sentence_perf: 'De brief is vanmorgen aangekomen.', sentence_perf_en: 'The letter arrived this morning.' },
    { infinitief: 'bakken', imperfectum: 'bakte, bakten', perfectum: 'heeft gebakken', english: 'to bake', sentence_inf: 'Ik ga een taart bakken.', sentence_inf_en: 'I am going to bake a cake.', sentence_imp: 'Mijn moeder bakte vroeger elke week brood.', sentence_imp_en: 'My mother used to bake bread every week.', sentence_perf: 'Heb je ooit een appeltaart gebakken?', sentence_perf_en: 'Have you ever baked an apple pie?' },
    { infinitief: 'beginnen', imperfectum: 'begon, begonnen', perfectum: 'is begonnen', english: 'to begin, start', sentence_inf: 'De les zal om negen uur beginnen.', sentence_inf_en: 'The class will begin at nine o\'clock.', sentence_imp: 'De film begon te laat.', sentence_imp_en: 'The movie started too late.', sentence_perf: 'De cursus is vorige week begonnen.', sentence_perf_en: 'The course started last week.' },
    { infinitief: 'begrijpen', imperfectum: 'begreep, begrepen', perfectum: 'heeft begrepen', english: 'to understand', sentence_inf: 'Ik probeer de tekst te begrijpen.', sentence_inf_en: 'I am trying to understand the text.', sentence_imp: 'Ik begreep de vraag niet.', sentence_imp_en: 'I did not understand the question.', sentence_perf: 'Hij heeft de instructies eindelijk begrepen.', sentence_perf_en: 'He has finally understood the instructions.' },
    { infinitief: 'bezoeken', imperfectum: 'bezocht, bezochten', perfectum: 'heeft bezocht', english: 'to visit', sentence_inf: 'We gaan volgende week onze familie bezoeken.', sentence_inf_en: 'We are going to visit our family next week.', sentence_imp: 'Zij bezocht haar oma in het ziekenhuis.', sentence_imp_en: 'She visited her grandmother in the hospital.', sentence_perf: 'Ik heb dat museum nog nooit bezocht.', sentence_perf_en: 'I have never visited that museum.' },
    { infinitief: 'bijten', imperfectum: 'beet, beten', perfectum: 'heeft gebeten', english: 'to bite', sentence_inf: 'Pas op, de hond kan bijten.', sentence_inf_en: 'Be careful, the dog can bite.', sentence_imp: 'De hond beet in zijn speelgoed.', sentence_imp_en: 'The dog bit its toy.', sentence_perf: 'Een wesp heeft mij in mijn arm gebeten.', sentence_perf_en: 'A wasp has bitten me in my arm.' },
    { infinitief: 'binden', imperfectum: 'bond, bonden', perfectum: 'heeft gebonden', english: 'to tie, bind', sentence_inf: 'Kun je dit touw voor me binden?', sentence_inf_en: 'Can you tie this rope for me?', sentence_imp: 'Zij bond een lint om het cadeau.', sentence_imp_en: 'She tied a ribbon around the gift.', sentence_perf: 'Hij heeft zijn veters nog niet gebonden.', sentence_perf_en: 'He has not tied his shoelaces yet.' },
    { infinitief: 'blazen', imperfectum: 'blies, bliezen', perfectum: 'heeft geblazen', english: 'to blow', sentence_inf: 'Je moet de kaarsjes uitblazen.', sentence_inf_en: 'You have to blow out the candles.', sentence_imp: 'De wind blies de bladeren van de bomen.', sentence_imp_en: 'The wind blew the leaves from the trees.', sentence_perf: 'Zij heeft de bal opgeblazen.', sentence_perf_en: 'She has inflated the ball.' },
    { infinitief: 'blijken', imperfectum: 'bleek, bleken', perfectum: 'is gebleken', english: 'to appear, turn out', sentence_inf: 'Het zal later blijken wie gelijk heeft.', sentence_inf_en: 'It will turn out later who is right.', sentence_imp: 'Het bleek een misverstand te zijn.', sentence_imp_en: 'It turned out to be a misunderstanding.', sentence_perf: 'Uit onderzoek is gebleken dat het werkt.', sentence_perf_en: 'Research has shown that it works.' },
    { infinitief: 'blijven', imperfectum: 'bleef, bleven', perfectum: 'is gebleven', english: 'to stay, remain', sentence_inf: 'Ik wil vanavond thuis blijven.', sentence_inf_en: 'I want to stay home tonight.', sentence_imp: 'Hij bleef tot laat op het feest.', sentence_imp_en: 'He stayed late at the party.', sentence_perf: 'Ben je de hele dag hier gebleven?', sentence_perf_en: 'Have you stayed here all day?' },
    { infinitief: 'breken', imperfectum: 'brak, braken', perfectum: 'heeft gebroken', english: 'to break', sentence_inf: 'Wees voorzichtig, het glas kan breken.', sentence_inf_en: 'Be careful, the glass can break.', sentence_imp: 'Hij brak zijn been tijdens het skiën.', sentence_imp_en: 'He broke his leg while skiing.', sentence_perf: 'Wie heeft dit kopje gebroken?', sentence_perf_en: 'Who has broken this cup?' },
    { infinitief: 'brengen', imperfectum: 'bracht, brachten', perfectum: 'heeft gebracht', english: 'to bring', sentence_inf: 'Ik zal de boeken morgen brengen.', sentence_inf_en: 'I will bring the books tomorrow.', sentence_imp: 'De postbode bracht een pakketje.', sentence_imp_en: 'The mailman brought a package.', sentence_perf: 'Heb je de kinderen naar school gebracht?', sentence_perf_en: 'Have you brought the children to school?' },
    { infinitief: 'denken', imperfectum: 'dacht, dachten', perfectum: 'heeft gedacht', english: 'to think', sentence_inf: 'Je moet goed nadenken over je toekomst.', sentence_inf_en: 'You have to think carefully about your future.', sentence_imp: 'Ik dacht dat je vandaag vrij was.', sentence_imp_en: 'I thought you were free today.', sentence_perf: 'Ik heb er lang over nagedacht.', sentence_perf_en: 'I have thought about it for a long time.' },
    { infinitief: 'doen', imperfectum: 'deed, deden', perfectum: 'heeft gedaan', english: 'to do', sentence_inf: 'Wat ga je dit weekend doen?', sentence_inf_en: 'What are you going to do this weekend?', sentence_imp: 'Wat deed je gisteravond?', sentence_imp_en: 'What did you do last night?', sentence_perf: 'Ik heb mijn huiswerk al gedaan.', sentence_perf_en: 'I have already done my homework.' },
    { infinitief: 'dragen', imperfectum: 'droeg, droegen', perfectum: 'heeft gedragen', english: 'to carry, wear', sentence_inf: 'Je moet een helm dragen.', sentence_inf_en: 'You must wear a helmet.', sentence_imp: 'Zij droeg een prachtige jurk.', sentence_imp_en: 'She wore a beautiful dress.', sentence_perf: 'Hij heeft de zware doos naar boven gedragen.', sentence_perf_en: 'He has carried the heavy box upstairs.' },
    { infinitief: 'drinken', imperfectum: 'dronk, dronken', perfectum: 'heeft gedronken', english: 'to drink', sentence_inf: 'Wil je iets drinken?', sentence_inf_en: 'Do you want to drink something?', sentence_imp: 'We dronken een glas wijn.', sentence_imp_en: 'We drank a glass of wine.', sentence_perf: 'Ik heb vanmorgen al koffie gedronken.', sentence_perf_en: 'I have already drunk coffee this morning.' },
    { infinitief: 'eten', imperfectum: 'at, aten', perfectum: 'heeft gegeten', english: 'to eat', sentence_inf: 'We gaan vanavond uit eten.', sentence_inf_en: 'We are going out for dinner tonight.', sentence_imp: 'Ik at gisteren een heerlijke salade.', sentence_imp_en: 'I ate a delicious salad yesterday.', sentence_perf: 'Heb je al ontbeten?', sentence_perf_en: 'Have you had breakfast yet?' },
    { infinitief: 'gaan', imperfectum: 'ging, gingen', perfectum: 'is gegaan', english: 'to go', sentence_inf: 'Ik wil naar de bioscoop gaan.', sentence_inf_en: 'I want to go to the cinema.', sentence_imp: 'Zij ging elke dag wandelen.', sentence_imp_en: 'She went for a walk every day.', sentence_perf: 'Hij is naar de supermarkt gegaan.', sentence_perf_en: 'He has gone to the supermarket.' },
    { infinitief: 'geven', imperfectum: 'gaf, gaven', perfectum: 'heeft gegeven', english: 'to give', sentence_inf: 'Ik zal je mijn pen geven.', sentence_inf_en: 'I will give you my pen.', sentence_imp: 'Hij gaf haar een mooi cadeau.', sentence_imp_en: 'He gave her a nice gift.', sentence_perf: 'Wie heeft jou die bloemen gegeven?', sentence_perf_en: 'Who has given you those flowers?' },
    { infinitief: 'hebben', imperfectum: 'had, hadden', perfectum: 'heeft gehad', english: 'to have', sentence_inf: 'Ik wil graag een hond hebben.', sentence_inf_en: 'I would like to have a dog.', sentence_imp: 'Vroeger had ik lang haar.', sentence_imp_en: 'I used to have long hair.', sentence_perf: 'Heb je een leuke vakantie gehad?', sentence_perf_en: 'Did you have a nice holiday?' },
    { infinitief: 'helpen', imperfectum: 'hielp, hielpen', perfectum: 'heeft geholpen', english: 'to help', sentence_inf: 'Kan ik u helpen?', sentence_inf_en: 'Can I help you?', sentence_imp: 'Hij hielp de oude vrouw met haar tassen.', sentence_imp_en: 'He helped the old woman with her bags.', sentence_perf: 'Zij heeft mij goed geholpen.', sentence_perf_en: 'She has helped me well.' },
    { infinitief: 'houden', imperfectum: 'hield, hielden', perfectum: 'heeft gehouden', english: 'to hold, to love', sentence_inf: 'Ik zal je hand vasthouden.', sentence_inf_en: 'I will hold your hand.', sentence_imp: 'Hij hield veel van zijn hond.', sentence_imp_en: 'He loved his dog very much.', sentence_perf: 'Ik heb me aan de regels gehouden.', sentence_perf_en: 'I have followed the rules.' },
    { infinitief: 'kiezen', imperfectum: 'koos, kozen', perfectum: 'heeft gekozen', english: 'to choose', sentence_inf: 'Je mag een dessert kiezen.', sentence_inf_en: 'You may choose a dessert.', sentence_imp: 'Ik koos de blauwe jurk.', sentence_imp_en: 'I chose the blue dress.', sentence_perf: 'Heb je al een hoofdgerecht gekozen?', sentence_perf_en: 'Have you already chosen a main course?' },
    { infinitief: 'kijken', imperfectum: 'keek, keken', perfectum: 'heeft gekeken', english: 'to look, watch', sentence_inf: 'Laten we een film kijken.', sentence_inf_en: 'Let\'s watch a movie.', sentence_imp: 'Hij keek uit het raam.', sentence_imp_en: 'He looked out the window.', sentence_perf: 'Ik heb de hele avond televisie gekeken.', sentence_perf_en: 'I have watched television all evening.' },
    { infinitief: 'komen', imperfectum: 'kwam, kwamen', perfectum: 'is gekomen', english: 'to come', sentence_inf: 'Zal je naar mijn feestje komen?', sentence_inf_en: 'Will you come to my party?', sentence_imp: 'Zij kwam altijd te laat.', sentence_imp_en: 'She always came too late.', sentence_perf: 'De gasten zijn al gekomen.', sentence_perf_en: 'The guests have already arrived.' },
    { infinitief: 'kopen', imperfectum: 'kocht, kochten', perfectum: 'heeft gekocht', english: 'to buy', sentence_inf: 'Ik moet nieuwe schoenen kopen.', sentence_inf_en: 'I have to buy new shoes.', sentence_imp: 'Hij kocht een huis in de stad.', sentence_imp_en: 'He bought a house in the city.', sentence_perf: 'Wat heb je voor haar verjaftrekkesdag gekocht?', sentence_perf_en: 'What did you buy for her birthday?' },
    { infinitief: 'krijgen', imperfectum: 'kreeg, kregen', perfectum: 'heeft gekregen', english: 'to get, receive', sentence_inf: 'Je kunt een gratis drankje krijgen.', sentence_inf_en: 'You can get a free drink.', sentence_imp: 'Ik kreeg een brief van de bank.', sentence_imp_en: 'I received a letter from the bank.', sentence_perf: 'Heb je mijn e-mail gekregen?', sentence_perf_en: 'Have you received my email?' },
    { infinitief: 'kunnen', imperfectum: 'kon, konden', perfectum: 'heeft gekund', english: 'to be able, can', sentence_inf: 'Ik wil dit graag kunnen.', sentence_inf_en: 'I would like to be able to do this.', sentence_imp: 'Vroeger kon ik heel hard rennen.', sentence_imp_en: 'I used to be able to run very fast.', sentence_perf: 'Het had gekund als je harder had gewerkt.', sentence_perf_en: 'It could have been possible if you had worked harder.' },
    { infinitief: 'lachen', imperfectum: 'lachte, lachten', perfectum: 'heeft gelachen', english: 'to laugh', sentence_inf: 'Zijn grappen doen me altijd lachen.', sentence_inf_en: 'His jokes always make me laugh.', sentence_imp: 'We lachten om de film.', sentence_imp_en: 'We laughed at the movie.', sentence_perf: 'Ik heb in tijden niet zo gelachen.', sentence_perf_en: 'I haven\'t laughed like that in ages.' },
    { infinitief: 'laten', imperfectum: 'liet, lieten', perfectum: 'heeft gelaten', english: 'to let, allow, leave', sentence_inf: 'Je moet de hond uitlaten.', sentence_inf_en: 'You have to walk the dog.', sentence_imp: 'Hij liet de deur openstaan.', sentence_imp_en: 'He left the door open.', sentence_perf: 'Waar heb je je tas gelaten?', sentence_perf_en: 'Where did you leave your bag?' },
    { infinitief: 'lezen', imperfectum: 'las, lazen', perfectum: 'heeft gelezen', english: 'to read', sentence_inf: 'Ik ga een boek lezen.', sentence_inf_en: 'I am going to read a book.', sentence_imp: 'Zij las de krant bij het ontbijt.', sentence_imp_en: 'She read the newspaper at breakfast.', sentence_perf: 'Heb je dit boek al gelezen?', sentence_perf_en: 'Have you already read this book?' },
    { infinitief: 'liggen', imperfectum: 'lag, lagen', perfectum: 'heeft gelegen', english: 'to lie down', sentence_inf: 'Ik ga even op de bank liggen.', sentence_inf_en: 'I\'m going to lie on the couch for a bit.', sentence_imp: 'De sleutels lagen op tafel.', sentence_imp_en: 'The keys were lying on the table.', sentence_perf: 'De stad heeft aan de rivier gelegen.', sentence_perf_en: 'The city was located on the river.' },
    { infinitief: 'lopen', imperfectum: 'liep, liepen', perfectum: 'is/heeft gelopen', english: 'to walk', sentence_inf: 'Laten we een stukje gaan lopen.', sentence_inf_en: 'Let\'s go for a walk.', sentence_imp: 'Ik liep vanmorgen naar mijn werk.', sentence_imp_en: 'I walked to work this morning.', sentence_perf: 'We hebben vijf kilometer gelopen.', sentence_perf_en: 'We have walked five kilometers.' },
    { infinitief: 'moeten', imperfectum: 'moest, moesten', perfectum: 'heeft gemoeten', english: 'to have to, must', sentence_inf: 'Ik zal harder moeten werken.', sentence_inf_en: 'I will have to work harder.', sentence_imp: 'Ik moest de trein halen.', sentence_imp_en: 'I had to catch the train.', sentence_perf: 'Het heeft zo moeten zijn.', sentence_perf_en: 'It was meant to be.' },
    { infinitief: 'mogen', imperfectum: 'mocht, mochten', perfectum: 'heeft gemogen', english: 'to be allowed to, may', sentence_inf: 'Je zult hier niet mogen roken.', sentence_inf_en: 'You will not be allowed to smoke here.', sentence_imp: 'Vroeger mocht ik niet laat opblijven.', sentence_imp_en: 'I wasn\'t allowed to stay up late in the past.', sentence_perf: 'Je had dat niet mogen zeggen.', sentence_perf_en: 'You shouldn\'t have said that.' },
    { infinitief: 'nemen', imperfectum: 'nam, namen', perfectum: 'heeft genomen', english: 'to take', sentence_inf: 'Zal ik de trap of de lift nemen?', sentence_inf_en: 'Should I take the stairs or the elevator?', sentence_imp: 'Hij nam een slok van zijn koffie.', sentence_imp_en: 'He took a sip of his coffee.', sentence_perf: 'Ik heb de verkeerde afslag genomen.', sentence_perf_en: 'I have taken the wrong exit.' },
    { infinitief: 'opstaan', imperfectum: 'stond op, stonden op', perfectum: 'is opgestaan', english: 'to get up', sentence_inf: 'Morgen moet ik vroeg opstaan.', sentence_inf_en: 'I have to get up early tomorrow.', sentence_imp: 'Hij stond op en verliet de kamer.', sentence_imp_en: 'He stood up and left the room.', sentence_perf: 'Ik ben vanmorgen om zeven uur opgestaan.', sentence_perf_en: 'I got up at seven o\'clock this morning.' },
    { infinitief: 'rijden', imperfectum: 'reed, reden', perfectum: 'is/heeft gereden', english: 'to ride, drive', sentence_inf: 'Ik wil leren motor rijden.', sentence_inf_en: 'I want to learn to ride a motorcycle.', sentence_imp: 'Hij reed te snel door de stad.', sentence_imp_en: 'He drove too fast through the city.', sentence_perf: 'We hebben de hele nacht gereden.', sentence_perf_en: 'We have driven all night.' },
    { infinitief: 'schrijven', imperfectum: 'schreef, schreven', perfectum: 'heeft geschreven', english: 'to write', sentence_inf: 'Ik moet een e-mail schrijven.', sentence_inf_en: 'I have to write an email.', sentence_imp: 'Zij schreef een gedicht voor hem.', sentence_imp_en: 'She wrote a poem for him.', sentence_perf: 'Wie heeft dit boek geschreven?', sentence_perf_en: 'Who has written this book?' },
    { infinitief: 'slaan', imperfectum: 'sloeg, sloegen', perfectum: 'heeft geslagen', english: 'to hit, beat', sentence_inf: 'Je mag de hond niet slaan.', sentence_inf_en: 'You are not allowed to hit the dog.', sentence_imp: 'De klok sloeg twaalf uur.', sentence_imp_en: 'The clock struck twelve.', sentence_perf: 'Hij heeft de bal over het net geslagen.', sentence_perf_en: 'He has hit the ball over the net.' },
    { infinitief: 'slapen', imperfectum: 'sliep, sliepen', perfectum: 'heeft geslapen', english: 'to sleep', sentence_inf: 'Ik ga vanavond vroeg slapen.', sentence_inf_en: 'I am going to sleep early tonight.', sentence_imp: 'De baby sliep de hele nacht door.', sentence_imp_en: 'The baby slept through the whole night.', sentence_perf: 'Heb je goed geslapen?', sentence_perf_en: 'Did you sleep well?' },
    { infinitief: 'sluiten', imperfectum: 'sloot, sloten', perfectum: 'heeft gesloten', english: 'to close', sentence_inf: 'Wil je het raam sluiten?', sentence_inf_en: 'Do you want to close the window?', sentence_imp: 'Hij sloot de deur achter zich.', sentence_imp_en: 'He closed the door behind him.', sentence_perf: 'De winkel heeft zijn deuren gesloten.', sentence_perf_en: 'The store has closed its doors.' },
    { infinitief: 'spreken', imperfectum: 'sprak, spraken', perfectum: 'heeft gesproken', english: 'to speak', sentence_inf: 'Ik wil graag met de manager spreken.', sentence_inf_en: 'I would like to speak with the manager.', sentence_imp: 'Zij sprak vloeiend Frans.', sentence_imp_en: 'She spoke French fluently.', sentence_perf: 'Ik heb hem gisteren nog gesproken.', sentence_perf_en: 'I spoke to him just yesterday.' },
    { infinitief: 'staan', imperfectum: 'stond, stonden', perfectum: 'heeft gestaan', english: 'to stand', sentence_inf: 'Je mag hier niet blijven staan.', sentence_inf_en: 'You are not allowed to stand here.', sentence_imp: 'Er stond een lange rij voor de kassa.', sentence_imp_en: 'There was a long queue at the checkout.', sentence_perf: 'Mijn fiets heeft hier de hele dag gestaan.', sentence_perf_en: 'My bike has been here all day.' },
    { infinitief: 'stelen', imperfectum: 'stal, stalen', perfectum: 'heeft gestolen', english: 'to steal', sentence_inf: 'Het is verkeerd om te stelen.', sentence_inf_en: 'It is wrong to steal.', sentence_imp: 'Een dief stal haar portemonnee.', sentence_imp_en: 'A thief stole her wallet.', sentence_perf: 'Iemand heeft mijn fiets gestolen.', sentence_perf_en: 'Someone has stolen my bicycle.' },
    { infinitief: 'sterven', imperfectum: 'stierf, stierven', perfectum: 'is gestorven', english: 'to die', sentence_inf: 'Niemand wil alleen sterven.', sentence_inf_en: 'Nobody wants to die alone.', sentence_imp: 'Hij stierf op jonge leeftijd.', sentence_imp_en: 'He died at a young age.', sentence_perf: 'De plant is gestorven door te weinig water.', sentence_perf_en: 'The plant has died from too little water.' },
    { infinitief: 'trekken', imperfectum: 'trok, trokken', perfectum: 'heeft getrokken', english: 'to pull', sentence_inf: 'Je moet aan het touw trekken.', sentence_inf_en: 'You have to pull the rope.', sentence_imp: 'Hij trok de aandacht met zijn verhaal.', sentence_imp_en: 'He drew attention with his story.', sentence_perf: 'Ik heb een lootje getrokken.', sentence_perf_en: 'I have drawn a lot.' },
    { infinitief: 'vallen', imperfectum: 'viel, vielen', perfectum: 'is gevallen', english: 'to fall', sentence_inf: 'Pas op dat je niet zult vallen.', sentence_inf_en: 'Be careful not to fall.', sentence_imp: 'De appel viel van de boom.', sentence_imp_en: 'The apple fell from the tree.', sentence_perf: 'Ik ben van de trap gevallen.', sentence_perf_en: 'I have fallen down the stairs.' },
    { infinitief: 'vangen', imperfectum: 'ving, vingen', perfectum: 'heeft gevangen', english: 'to catch', sentence_inf: 'Probeer de bal te vangen.', sentence_inf_en: 'Try to catch the ball.', sentence_imp: 'De politie ving de dief.', sentence_imp_en: 'The police caught the thief.', sentence_perf: 'De kat heeft een muis gevangen.', sentence_perf_en: 'The cat has caught a mouse.' },
    { infinitief: 'vergeten', imperfectum: 'vergat, vergaten', perfectum: 'is/heeft vergeten', english: 'to forget', sentence_inf: 'Je moet je sleutels niet vergeten.', sentence_inf_en: 'You must not forget your keys.', sentence_imp: 'Ik vergat zijn naam.', sentence_imp_en: 'I forgot his name.', sentence_perf: 'Ik ben mijn wachtwoord vergeten.', sentence_perf_en: 'I have forgotten my password.' },
    { infinitief: 'verkopen', imperfectum: 'verkocht, verkochten', perfectum: 'heeft verkocht', english: 'to sell', sentence_inf: 'Ik ga mijn auto verkopen.', sentence_inf_en: 'I am going to sell my car.', sentence_imp: 'Zij verkocht haar huis met winst.', sentence_imp_en: 'She sold her house at a profit.', sentence_perf: 'Alle kaartjes zijn al verkocht.', sentence_perf_en: 'All the tickets have already been sold.' },
    { infinitief: 'verliezen', imperfectum: 'verloor, verloren', perfectum: 'heeft verloren', english: 'to lose', sentence_inf: 'Niemand wil de finale verliezen.', sentence_inf_en: 'Nobody wants to lose the final.', sentence_imp: 'Hij verloor zijn baan.', sentence_imp_en: 'He lost his job.', sentence_perf: 'Ik heb mijn portemonnee verloren.', sentence_perf_en: 'I have lost my wallet.' },
    { infinitief: 'vertrekken', imperfectum: 'vertrok, vertrokken', perfectum: 'is vertrokken', english: 'to depart, leave', sentence_inf: 'We moeten op tijd vertrekken.', sentence_inf_en: 'We have to leave on time.', sentence_imp: 'De trein vertrok precies om acht uur.', sentence_imp_en: 'The train left at exactly eight o\'clock.', sentence_perf: 'Hij is al naar het vliegveld vertrokken.', sentence_perf_en: 'He has already left for the airport.' },
    { infinitief: 'vinden', imperfectum: 'vond, vonden', perfectum: 'heeft gevonden', english: 'to find', sentence_inf: 'Ik hoop een goede oplossing te vinden.', sentence_inf_en: 'I hope to find a good solution.', sentence_imp: 'Ik vond het een leuke film.', sentence_imp_en: 'I found it a fun movie.', sentence_perf: 'Heb je je sleutels al gevonden?', sentence_perf_en: 'Have you found your keys yet?' },
    { infinitief: 'vliegen', imperfectum: 'vloog, vlogen', perfectum: 'is/heeft gevlogen', english: 'to fly', sentence_inf: 'Ik zou graag eens willen vliegen.', sentence_inf_en: 'I would like to fly sometime.', sentence_imp: 'De vogel vloog naar het zuiden.', sentence_imp_en: 'The bird flew south.', sentence_perf: 'Ik heb nog nooit gevlogen.', sentence_perf_en: 'I have never flown before.' },
    { infinitief: 'vragen', imperfectum: 'vroeg, vroegen', perfectum: 'heeft gevraagd', english: 'to ask', sentence_inf: 'Je kunt het aan de leraar vragen.', sentence_inf_en: 'You can ask the teacher.', sentence_imp: 'Hij vroeg haar om haar telefoonnummer.', sentence_imp_en: 'He asked her for her phone number.', sentence_perf: 'Ik heb hem gevraagd om te helpen.', sentence_perf_en: 'I have asked him to help.' },
    { infinitief: 'wassen', imperfectum: 'waste, wasten', perfectum: 'heeft gewassen', english: 'to wash', sentence_inf: 'Ik moet mijn kleren wassen.', sentence_inf_en: 'I have to wash my clothes.', sentence_imp: 'Zij waste haar haar elke dag.', sentence_imp_en: 'She washed her hair every day.', sentence_perf: 'Heb je je handen gewassen?', sentence_perf_en: 'Have you washed your hands?' },
    { infinitief: 'weten', imperfectum: 'wist, wisten', perfectum: 'heeft geweten', english: 'to know', sentence_inf: 'Ik wil graag het antwoord weten.', sentence_inf_en: 'I would like to know the answer.', sentence_imp: 'Ik wist niet dat je hier was.', sentence_imp_en: 'I did not know you were here.', sentence_perf: 'Ik had het moeten weten.', sentence_perf_en: 'I should have known.' },
    { infinitief: 'willen', imperfectum: 'wilde/wou, wilden', perfectum: 'heeft gewild', english: 'to want', sentence_inf: 'Wat zou je willen eten?', sentence_inf_en: 'What would you like to eat?', sentence_imp: 'Hij wilde graag naar buiten.', sentence_imp_en: 'He really wanted to go outside.', sentence_perf: 'Ik heb dit altijd al gewild.', sentence_perf_en: 'I have always wanted this.' },
    { infinitief: 'winnen', imperfectum: 'won, wonnen', perfectum: 'heeft gewonnen', english: 'to win', sentence_inf: 'Iedereen wil de wedstrijd winnen.', sentence_inf_en: 'Everyone wants to win the match.', sentence_imp: 'Ons team won de beker.', sentence_imp_en: 'Our team won the cup.', sentence_perf: 'Zij heeft de loterij gewonnen.', sentence_perf_en: 'She has won the lottery.' },
    { infinitief: 'worden', imperfectum: 'werd, werden', perfectum: 'is geworden', english: 'to become', sentence_inf: 'Wat wil je later worden?', sentence_inf_en: 'What do you want to be when you grow up?', sentence_imp: 'Het werd langzaam donker.', sentence_imp_en: 'It was slowly getting dark.', sentence_perf: 'Hij is een beroemde acteur geworden.', sentence_perf_en: 'He has become a famous actor.' },
    { infinitief: 'zeggen', imperfectum: 'zei, zeiden', perfectum: 'heeft gezegd', english: 'to say', sentence_inf: 'Je moet eerlijk zeggen wat je denkt.', sentence_inf_en: 'You have to honestly say what you think.', sentence_imp: 'Hij zei dat hij later zou komen.', sentence_imp_en: 'He said he would come later.', sentence_perf: 'Wat heb je tegen hem gezegd?', sentence_perf_en: 'What did you say to him?' },
    { infinitief: 'zien', imperfectum: 'zag, zagen', perfectum: 'heeft gezien', english: 'to see', sentence_inf: 'Ik hoop je snel weer te zien.', sentence_inf_en: 'I hope to see you again soon.', sentence_imp: 'Ik zag een bekend gezicht in de menigte.', sentence_imp_en: 'I saw a familiar face in the crowd.', sentence_perf: 'Heb je de nieuwe film al gezien?', sentence_perf_en: 'Have you seen the new movie yet?' },
    { infinitief: 'zijn', imperfectum: 'was, waren', perfectum: 'is geweest', english: 'to be', sentence_inf: 'Je moet gewoon jezelf zijn.', sentence_inf_en: 'You just have to be yourself.', sentence_imp: 'Het was gisteren prachtig weer.', sentence_imp_en: 'The weather was beautiful yesterday.', sentence_perf: 'Ik ben nog nooit in Australië geweest.', sentence_perf_en: 'I have never been to Australia.' },
    { infinitief: 'zingen', imperfectum: 'zong, zongen', perfectum: 'heeft gezongen', english: 'to sing', sentence_inf: 'Ik hou ervan om te zingen.', sentence_inf_en: 'I love to sing.', sentence_imp: 'Zij zong een lied op het podium.', sentence_imp_en: 'She sang a song on stage.', sentence_perf: 'We hebben de hele avond liedjes gezongen.', sentence_perf_en: 'We sang songs all evening.' },
    { infinitief: 'zitten', imperfectum: 'zat, zaten', perfectum: 'heeft gezeten', english: 'to sit', sentence_inf: 'Je mag hier gaan zitten.', sentence_inf_en: 'You may sit here.', sentence_imp: 'De kat zat op de vensterbank.', sentence_imp_en: 'The cat was sitting on the windowsill.', sentence_perf: 'Ik heb de hele dag achter mijn bureau gezeten.', sentence_perf_en: 'I have been sitting at my desk all day.' },
    { infinitief: 'zoeken', imperfectum: 'zocht, zochten', perfectum: 'heeft gezocht', english: 'to search, look for', sentence_inf: 'We moeten een oplossing zoeken.', sentence_inf_en: 'We have to look for a solution.', sentence_imp: 'Hij zocht overal naar zijn bril.', sentence_imp_en: 'He looked everywhere for his glasses.', sentence_perf: 'Ik heb het woord in het woordenboek gezocht.', sentence_perf_en: 'I have looked up the word in the dictionary.' },
    { infinitief: 'zwemmen', imperfectum: 'zwom, zwommen', perfectum: 'is/heeft gezwommen', english: 'to swim', sentence_inf: 'In de zomer kun je hier heerlijk zwemmen.', sentence_inf_en: 'In the summer you can swim wonderfully here.', sentence_imp: 'We zwommen in het meer.', sentence_imp_en: 'We swam in the lake.', sentence_perf: 'Ik heb vanmorgen een uur gezwommen.', sentence_perf_en: 'I swam for an hour this morning.' },
];


// --- Helper function to shuffle an array ---
const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

// --- SVG Icons ---
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

const ShuffleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.4c1.3 0 2.5.6 3.3 1.7l6.1 8.6c.7 1.1 2 1.7 3.3 1.7H22"/><path d="m18 22-4-4 4-4"/></svg>
);

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
);


// --- Main App Component ---
function App() {
    const [verbs, setVerbs] = useState(() => shuffleArray([...allVerbs]));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [practiceMode, setPracticeMode] = useState(null); // 'infinitief', 'imperfectum', 'perfectum', 'all'

    // PWA setup effect
    useEffect(() => {
        if (!document.querySelector('#app-manifest')) {
            const manifest = {
                name: 'Dutch Verb Flashcards',
                short_name: 'Dutch Verbs',
                start_url: '.',
                display: 'standalone',
                background_color: '#f3f4f6',
                theme_color: '#4f46e5',
                icons: [
                    { src: '/logo192.png', type: 'image/png', sizes: '192x192' },
                    { src: '/logo512.png', type: 'image/png', sizes: '512x512' },
                ],
            };
            const manifestBlob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
            const manifestUrl = URL.createObjectURL(manifestBlob);
            const link = document.createElement('link');
            link.id = 'app-manifest';
            link.rel = 'manifest';
            link.href = manifestUrl;
            document.head.appendChild(link);
        }
    }, []);

    const handleNext = useCallback(() => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % verbs.length);
        }, 150);
    }, [verbs.length]);

    const handlePrev = useCallback(() => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + verbs.length) % verbs.length);
        }, 150);
    }, [verbs.length]);
    
    const handleShuffle = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setVerbs(shuffleArray([...allVerbs]));
            setCurrentIndex(0);
        }, 150);
    };
    
    const startPractice = (mode) => {
        setPracticeMode(mode);
        handleShuffle();
    };

    const handleKeyDown = useCallback((event) => {
        if (!practiceMode) return;
        if (event.key === 'ArrowRight') handleNext();
        if (event.key === 'ArrowLeft') handlePrev();
        if (event.key === ' ') {
            event.preventDefault(); // Prevent page scroll
            setIsFlipped(f => !f);
        }
    }, [handleNext, handlePrev, practiceMode]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    if (!practiceMode) {
        return (
            <main className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4 font-sans text-gray-800">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-indigo-600 mb-2">Leer de Werkwoorden</h1>
                    <p className="text-lg text-gray-600 mb-8">Kies een vorm om te oefenen.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button onClick={() => startPractice('infinitief')} className="w-full text-lg bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300">Oefen de <strong>Infinitief</strong></button>
                        <button onClick={() => startPractice('imperfectum')} className="w-full text-lg bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300">Oefen het <strong>Imperfectum</strong></button>
                        <button onClick={() => startPractice('perfectum')} className="w-full text-lg bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300">Oefen het <strong>Perfectum</strong></button>
                        <button onClick={() => startPractice('all')} className="w-full text-lg bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300">Oefen <strong>Alle Vormen</strong></button>
                    </div>
                </div>
            </main>
        );
    }
    
    const currentVerb = verbs[currentIndex];

    // --- Configure cards based on practice mode ---
    let frontContent, backContent;
    
    const englishMeaning = {label: 'Meaning', key: 'english', textSize: 'text-xl md:text-2xl'};

    const getSentenceContent = (mode) => {
        const sentenceKey = `sentence_${mode.slice(0, 3)}`;
        const sentenceTranslationKey = `${sentenceKey}_en`;
        return [
            {label: 'Voorbeeldzin', key: sentenceKey, textSize: 'text-sm md:text-base font-normal italic'},
            {label: 'Translation', key: sentenceTranslationKey, textSize: 'text-sm md:text-base font-normal italic text-gray-500'},
        ];
    };

    if (practiceMode === 'all') {
        frontContent = [
            {label: 'Infinitief', key: 'infinitief', textSize: 'text-xl md:text-2xl'},
        ];
        backContent = [
            {label: 'Imperfectum', key: 'imperfectum', textSize: 'text-lg md:text-xl'},
            {label: 'Perfectum', key: 'perfectum', textSize: 'text-lg md:text-xl'},
            englishMeaning,
            ...getSentenceContent('infinitief'),
        ];
    } else {
        frontContent = [{
            label: practiceMode.charAt(0).toUpperCase() + practiceMode.slice(1),
            key: practiceMode,
            textSize: 'text-xl md:text-2xl'
        }];
        
        const otherForms = [
            {label: 'Infinitief', key: 'infinitief', textSize: 'text-lg md:text-xl'},
            {label: 'Imperfectum', key: 'imperfectum', textSize: 'text-lg md:text-xl'},
            {label: 'Perfectum', key: 'perfectum', textSize: 'text-lg md:text-xl'},
        ].filter(form => form.key !== practiceMode);

        backContent = [
            ...otherForms,
            englishMeaning,
            ...getSentenceContent(practiceMode),
        ];
    }

    // --- Card Face Component ---
    const CardFace = ({ title, content, verb, isFront }) => (
        <div className={`absolute w-full h-full bg-white rounded-2xl shadow-lg backface-hidden flex flex-col justify-center items-center p-4 md:p-6 text-center transition-transform duration-500 ${isFront ? '' : 'transform-rotate-y-180'}`}>
            <h3 className="text-sm font-semibold text-gray-400 mb-2 md:mb-4 uppercase tracking-widest">{title}</h3>
            <div className="overflow-y-auto w-full px-2">
                {content.map(({label, key, textSize = 'text-lg md:text-xl'}) => (
                    <div key={key} className="my-2 w-full">
                        <p className="text-xs text-indigo-500">{label}</p>
                        <p className={`${textSize} font-bold text-gray-800 px-2 break-words`}>{verb[key]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
    
    return (
        <main className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4 font-sans text-gray-800">
             <button onClick={() => setPracticeMode(null)} className="absolute top-4 left-4 flex items-center p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition-colors z-10">
                <BackIcon />
                <span className="ml-2 hidden md:inline">Terug</span>
            </button>
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
                <header className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-indigo-600">Onregelmatige Werkwoorden</h1>
                    <p className="text-gray-500 mt-1">Geselecteerde modus: <strong>{practiceMode.charAt(0).toUpperCase() + practiceMode.slice(1)}</strong></p>
                </header>

                <div className="w-full max-w-md h-96 perspective-1000">
                    <div 
                        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d cursor-pointer ${isFlipped ? 'transform-rotate-y-180' : ''}`}
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        <CardFace title="Nederlands" content={frontContent} verb={currentVerb} isFront={true} />
                        <CardFace title="Antwoord" content={backContent} verb={currentVerb} isFront={false} />
                    </div>
                </div>

                <p className="mt-6 text-lg font-semibold text-gray-500">{currentIndex + 1} / {verbs.length}</p>

                <div className="flex items-center justify-center space-x-4 mt-4 w-full max-w-md">
                    <button onClick={handlePrev} className="p-4 bg-white rounded-full shadow-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <ChevronLeftIcon />
                    </button>
                    <button onClick={handleShuffle} className="p-4 bg-white rounded-full shadow-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <ShuffleIcon />
                    </button>
                    <button onClick={handleNext} className="p-4 bg-white rounded-full shadow-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <ChevronRightIcon />
                    </button>
                </div>
                 <footer className="text-center mt-8 text-gray-400 text-sm">
                    <p>Use ← and → arrow keys to navigate, Spacebar to flip.</p>
                </footer>
            </div>
        </main>
    );
}

// Custom CSS for 3D transform effects
// This can be moved to index.css if preferred
const styles = document.createElement('style');
styles.innerHTML = `
    .perspective-1000 { perspective: 1000px; }
    .transform-style-preserve-3d { transform-style: preserve-3d; }
    .transform-rotate-y-180 { transform: rotateY(180deg); }
    .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
`;
document.head.appendChild(styles);


export default App;
