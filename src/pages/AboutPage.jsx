import Aside from '../components/Aside';

function AboutPage() {

    return (

        <>
            <main>
                <h1
                    className="my-4 text-3xl text-center font-semibold py-4"
                >
                    APIE 25MIN
                </h1>
            </main>

            <div
                className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 md:items-start"
            >
                <article className="xl:col-span-9 lg:col-span-8 md:col-span-8">
                    <div
                        className="ml-8 mr-8 bg-bermuda/[.75] rounded-md drop-shadow-md mb-4 pb-4"
                    >
                        <h2 className="text-2xl pl-4 pt-4 xl:text-left text-center">
                            Mūsų tikslas
                        </h2>
                        <div className="pl-4">
                            <p>
                                Mūsų tikslas - įkvėpti, edukuoti ir suartinti kelionių bei
                                gyvenimo džiaugsmo ieškančius žmones. Siekiame, kad mūsų
                                tinklaraštis būtų vieta, kurioje kiekvienas skaitytojas rastų
                                įdomių kelionių idėjų, praktiškų patarimų ir motyvacijos išvykti
                                į nuotykį, nesvarbu, ar tai būtų savaitgalis šalia namų, ar
                                kelionė į kitą pasaulio kraštą. Mūsų straipsniai padės atrasti,
                                kas svarbu keliaujant - nuo kultūros pažinimo iki atsakingo ir
                                sąmoningo kelionių planavimo.
                            </p>
                        </div>

                        <div className="h-[1px] w-max-full bg-black/80 mx-1 sm:mx-2" aria-hidden="true"></div>

                        <h2 className="text-2xl pl-4 pt-4 xl:text-left text-center">
                            Mūsų idėja
                        </h2>



                        <div className="pl-4">
                            <p>
                                Esame įsitikinę, kad kelionės praturtina gyvenimą ir ugdo žmogų.
                                Mūsų idėja - suburti bendruomenę žmonių, kurie domisi pasauliu
                                ir siekia augti per keliones. Šiame puslapyje dalinamės ne tik
                                tradicinėmis kelionių kryptimis, bet ir unikaliomis vietomis,
                                kurias pamiršta daugelis gidų. Tikime, kad kelionės įdomios
                                tada, kai gali atrasti kažką nepaprasto ir netikėto. Norime, kad
                                kiekviena kelionė, kurią planuosite su mūsų pagalba, būtų
                                ypatinga, tikslinga ir sukurta su džiaugsmu.
                            </p>
                        </div>

                        <div className="h-[1px] w-max-full bg-black/80 mx-1 sm:mx-2" aria-hidden="true"></div>

                        <h2 className="text-2xl pl-4 pt-4 xl:text-left text-center">
                            Mūsų partneriai
                        </h2>
                        <div className="pl-4">
                            <p>
                                Mes bendradarbiaujame su įvairiais kelionių, apgyvendinimo ir
                                laisvalaikio organizatoriais, kurie padeda mums pateikti
                                skaitytojams naudingą ir aktualią informaciją. Mūsų partneriai
                                padeda pasiūlyti geriausias galimybes iš viso pasaulio, taip
                                užtikrindami aukštą kelionių kokybę ir naujausias idėjas.
                                Dirbdami su atsakingais ir patikimais partneriais, siekiame, kad
                                kelionės būtų patogios, prieinamos ir, svarbiausia,
                                nepamirštamos
                            </p>
                        </div>
                    </div>
                </article>
                    <Aside />
            </div>
        </>
    );
}

export default AboutPage;