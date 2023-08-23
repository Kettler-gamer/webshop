export default function Header(props: object){
    return (<header>
        <h1>NODC</h1>
        <div>
            <svg width={75} height={75}>
                <circle cx={37.5} cy={20} r={15} fill="black"/>
                <path d="M13,65 a20,20 0 0 1 50,0"/>
            </svg>
        </div>
    </header>)
}