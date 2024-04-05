function Loading() {
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
            textAlign: 'center',
            marginBottom: '30px',
            marginTop: '30px'
        }}>
            <img src="./Imagenes/game logo.png" alt="Logo" style={{ 
                width: '40%',
                height: 'auto',
                marginBottom: '20px'
             }} />
            <div><img src='./Imagenes/loading.gif' alt='Cargando' style={{
                width:'90%', 
                heigth:'auto',
            }}></img></div>
        </div>
    )
}