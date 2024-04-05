//const Content = require('./Content');

function App(){
    return(
        document.body.style.margin = 0,
        <div id = "app" style={{
            backgroundImage: 'url(./Imagenes/backgroundImage.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            display: 'flex', 
            flexDirection: 'column',
            width: '100vw',
            height: '100vh',
            overflowY: 'auto'
        }}>
            <Header/>
            <Content/>
        </div>
    )
}

ReactDOM.render(
    // COMPONENTE BANNER
    <App/>,
    document.getElementById('master')
);