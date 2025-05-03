import Head from 'next/head'

const Meta = ({ title, description }) => {
    return (
        <Head>
            <title>Yigli Family {title && `| ${title}`}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="img/logo-nobg.png" type="image/png" />
        </Head>
    )
}

export default Meta