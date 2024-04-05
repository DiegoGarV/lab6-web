function Card({title, content, image, description}) {
    return (
        <div id="card" style={{
            height: 'auto',
            width: '50%',
            background: 'linear-gradient(to right, #faae46, #facd73)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: '20px',
            paddingRight: '20px',
            borderRadius: '20px',
            position: 'relative',
            border: '5px solid #c0240c',
            marginBottom: '20px'
        }}>
            <div id = "postText">
                <h1>{title}</h1>
                <p>{content}</p>
            </div>
            <img src={image} alt={description} style={{ width: '100%', maxHeight: '50%', borderRadius: '10px' }} />
        </div>
    );
}
