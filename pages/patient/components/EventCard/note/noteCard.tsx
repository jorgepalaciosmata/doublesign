import { Text } from 'react-native';

export default function NoteCard(props: { text: string }) {
   
    return (
    <div style={{ 
        width: "90%", 
        display: "inline-block",
        margin: "0 auto",
        maxHeight: "400px", 
        backgroundColor: "#fffed7",
        textAlign: "left",
        borderRadius: '5px',
        height:"100%",
        padding: "15px" }}>
            <div style={{ textAlign: "left"}}>
                <Text style={{ color: "#ff7c1e" }}>
                    {props.text}
                </Text>
            </div>
    </div>
    );
}