import React from 'react';
import Head from 'next/head';
import { useLoggedInUser } from '../context/authentication/AuthenticationContext';
import { createMetaTitle } from '../utility/metaUtilities';
import MainLayout from '../primitives/mainLayout/MainLayout';

const Home: React.FC = () => {
    const user = useLoggedInUser();

    return (
        <MainLayout.Body>
            <Head>
                <title>{createMetaTitle('Todos')}</title>
            </Head>
            <MainLayout.ContentMain>
                <p>Hello {user.name},</p>
                <p>
                    Cillum asperiores? Magni voluptas ultricies ut viverra
                    quidem, a! Quisquam malesuada modi. Aliquid sagittis ullam
                    consequatur nascetur nulla culpa! Congue! Urna pretium.
                    Taciti porta augue elementum! Sagittis officia. Molestie
                    phasellus, lectus, vulputate laboris reprehenderit irure
                    mus! Dolorum fugit tincidunt, euismod! Nostrum cubilia cum
                    illum excepteur, ultrices metus nesciunt, accumsan beatae
                    donec curabitur penatibus placerat, iste rem, tellus
                    consequat felis irure, donec distinctio repudiandae
                    hymenaeos facilisi do pede laboris justo, urna. Sociosqu
                    repellat libero ullam, arcu doloribus pariatur, sem pariatur
                    repudiandae expedita est maxime curabitur! Duis, autem
                    aliquet purus, ea minim irure fusce nam sed, doloribus
                    nonummy, veritatis ultrices, blanditiis, lacus.
                </p>

                <p>
                    Quaerat urna! Facilisi ridiculus fringilla libero, atque
                    nullam voluptatum, consequatur urna incididunt! Molestiae
                    orci occaecati magni, fugit dolore? Asperiores scelerisque
                    cum torquent iste magnis, potenti temporibus, ducimus error
                    numquam, iure ac ullamco delectus ullam, netus, sodales,
                    tincidunt viverra? Molestias incididunt, magni sint?
                    Voluptatibus semper posuere officiis pharetra eius erat
                    vulputate error numquam senectus imperdiet duis quae optio
                    mattis integer mollitia, scelerisque reprehenderit euismod
                    incididunt rutrum natoque cillum. Curae. Id incidunt? Dolor
                    eu luctus quaerat quaerat vitae, nostra quibusdam lorem et,
                    quisquam illo dolore. Nemo deleniti pharetra donec? Animi
                    convallis dolorem, nostrud per repellendus blandit dis
                    molestias iusto atque dolores nulla.
                </p>

                <p>
                    Exercitation ullam facere alias hendrerit sit congue
                    torquent eos ullamco quisque integer? Lectus pellentesque
                    nesciunt pede. Occaecati eius reiciendis sem aliquam laborum
                    porro diam nobis dolores vitae? Sint. Quam eligendi
                    vulputate cras tortor placeat molestiae odit quos, gravida
                    autem suspendisse? Tempus interdum autem nisl, placeat
                    dolorem egestas mauris! Vel doloremque! Eius! Montes do amet
                    pharetra necessitatibus, sit adipisicing porttitor
                    assumenda, elementum cupidatat ex laudantium, quo culpa.
                    Fusce placeat accumsan, pulvinar esse ab, officia curabitur
                    ad sunt rem placerat montes vestibulum, dictumst! Dolore
                    conubia pariatur, per per do officiis facilisi! Eligendi,
                    illum itaque quisquam sollicitudin augue torquent delectus
                    pharetra penatibus tempora.
                </p>
                <p>
                    Cillum asperiores? Magni voluptas ultricies ut viverra
                    quidem, a! Quisquam malesuada modi. Aliquid sagittis ullam
                    consequatur nascetur nulla culpa! Congue! Urna pretium.
                    Taciti porta augue elementum! Sagittis officia. Molestie
                    phasellus, lectus, vulputate laboris reprehenderit irure
                    mus! Dolorum fugit tincidunt, euismod! Nostrum cubilia cum
                    illum excepteur, ultrices metus nesciunt, accumsan beatae
                    donec curabitur penatibus placerat, iste rem, tellus
                    consequat felis irure, donec distinctio repudiandae
                    hymenaeos facilisi do pede laboris justo, urna. Sociosqu
                    repellat libero ullam, arcu doloribus pariatur, sem pariatur
                    repudiandae expedita est maxime curabitur! Duis, autem
                    aliquet purus, ea minim irure fusce nam sed, doloribus
                    nonummy, veritatis ultrices, blanditiis, lacus.
                </p>

                <p>
                    Quaerat urna! Facilisi ridiculus fringilla libero, atque
                    nullam voluptatum, consequatur urna incididunt! Molestiae
                    orci occaecati magni, fugit dolore? Asperiores scelerisque
                    cum torquent iste magnis, potenti temporibus, ducimus error
                    numquam, iure ac ullamco delectus ullam, netus, sodales,
                    tincidunt viverra? Molestias incididunt, magni sint?
                    Voluptatibus semper posuere officiis pharetra eius erat
                    vulputate error numquam senectus imperdiet duis quae optio
                    mattis integer mollitia, scelerisque reprehenderit euismod
                    incididunt rutrum natoque cillum. Curae. Id incidunt? Dolor
                    eu luctus quaerat quaerat vitae, nostra quibusdam lorem et,
                    quisquam illo dolore. Nemo deleniti pharetra donec? Animi
                    convallis dolorem, nostrud per repellendus blandit dis
                    molestias iusto atque dolores nulla.
                </p>

                <p>
                    Exercitation ullam facere alias hendrerit sit congue
                    torquent eos ullamco quisque integer? Lectus pellentesque
                    nesciunt pede. Occaecati eius reiciendis sem aliquam laborum
                    porro diam nobis dolores vitae? Sint. Quam eligendi
                    vulputate cras tortor placeat molestiae odit quos, gravida
                    autem suspendisse? Tempus interdum autem nisl, placeat
                    dolorem egestas mauris! Vel doloremque! Eius! Montes do amet
                    pharetra necessitatibus, sit adipisicing porttitor
                    assumenda, elementum cupidatat ex laudantium, quo culpa.
                    Fusce placeat accumsan, pulvinar esse ab, officia curabitur
                    ad sunt rem placerat montes vestibulum, dictumst! Dolore
                    conubia pariatur, per per do officiis facilisi! Eligendi,
                    illum itaque quisquam sollicitudin augue torquent delectus
                    pharetra penatibus tempora.
                </p>
            </MainLayout.ContentMain>
        </MainLayout.Body>
    );
};

export default Home;
