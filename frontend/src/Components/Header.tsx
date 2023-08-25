export default function Header(){
    return (<header className="header">
        <h1 className="header-title">NODC</h1>
        <div className="header-btns">
            <svg className="profile-btn" width={75} height={75}>
                <circle className="head" cx={37.5} cy={20} r={15}/>
                <path className="body" d="M13,65 a20,20 0 0 1 50,0"/>
            </svg>
        </div>
    </header>)
}