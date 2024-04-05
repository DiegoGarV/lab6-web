function Content(){
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    async function apiCall(){
        try {
            const response = await fetch('http://127.0.0.1:3000/blogs')
            const jsonData = await response.json()
            setData(jsonData.data)
            setLoading(false)
        } catch (error) {
            console.error('Error al cargar la API:', error)
            setLoading(false)
        }
    }

    React.useEffect(() => {
        apiCall()
    }, [data])

    if (loading) {
        return(<Loading />)
    } else if (data.length === 0) {
        return (<NoPosts />)
    }

    return (
        <div id="content" style={{
            height:'auto',
            width:'100%', 
            boxSizing: 'border-box',
            backgroundColor:'rgba(250,250,250,0)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
            marginTop: '30px'
        }}>
            <img src="./Imagenes/game logo.png" alt="Logo" style={{ 
                width: '40%',
                height: 'auto',
                marginBottom: '20px'
            }} />
            <div className='datos' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {data.map(elemento => (
                    <Card key={elemento.id} title={elemento.title} content={elemento.content} image={elemento.item_image} description={elemento.image_description} />
                ))}
            </div>
        </div>
    );
}