function Header(){
    return (
        <div id='header' style={{
            height:'auto',
            width:'100%',
            backgroundColor:'rgba(5,94,150,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            boxSizing: 'border-box',
            paddingTop: '20px',
            paddingBottom: '20px'
        }}>
            <input type="text" placeholder="Buscar post..." style={{width: '50%'}} />
            <button>Agregar Post</button>
        </div>
    );
}