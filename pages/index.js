import { faCheck, faTimes, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import { useState } from "react";

let misol = [
  { english: "Goodmorning,Children", uzbek: ["Salom", "Bolalar"], words: ["Salom", "O'zbekiston", "Qalesan", "Bolalar","Bola","okalar"], img: "bids_song.gif" },
  { english: "I study in School", uzbek: ["Men", "Maktabda", "O'qiyman"], words: ["Kolejda", "Men", "Maktabda", "O'qiyman", "Boraman"], img: "frog.gif" },
  { english: "She is Beatifull", uzbek: ["U", "Chiroyli"], words: ["U", "Chiroyli", "Hunuk", "Hursandman","Odobli"], img: "humans.gif" },
  
  { english: "Does He go to cafee?", uzbek: ["U", "cafega","borami?"], words: ["U", "ichgani", "cofega", "cafega","borami?","gaplashami?"], img: "person.gif" },
  { english: "I am lookin for picture of me", uzbek: ["Men", "rasmimni", "qidiryapman"], words: ["qidiryapman", "Men", "rasmimni", "qarayapman", "rasmimga"], img: "ice.gif" },
  { english: "Dog hate hotdog", uzbek: ["It", "hotdogni","yomon","ko'radi"], words: ["It", "yomon", "yaxshi", "issiq","bo'lishni","ko'radi","hotdogni"], img: "moon.gif" },

  { english: "Are ", uzbek: ["Salom", "O'zbekiston"], words: ["Salom", "O'zbekiston", "Qalesan", "Dunyo"], img: "penguin.gif" },

  { english: "did you study in English?", uzbek: ["sen", "ingliz","tilini", "o'qidingmi?"], words: ["sen", "Men", "ingliz", "O'qidingmi?", "organyapsanmi?"], img: "king.gif" },
  { english: "I am bored", uzbek: ["Men", "Zerikdim"], words: ["Men", "Charchadim", "Zerikdim", "Hursandman"], img: "person.gif" },
  { english: "Hello, Uzbekiston", uzbek: ["Salom", "O'zbekiston"], words: ["Salom", "O'zbekiston", "Qalesan", "Dunyo"], img: "penguin.gif" },
  ]

export default function Home() {

  const [misolNumber, setmisolNumber] = useState(0);

  const [choose, setchoose] = useState([]);

  const [javob, setjavob] = useState("");

  const [nextButton, setnextButton] = useState(false);

  const [isEnd, setisEnd] = useState(false)

  const chooseWord = (txt, i) => {
    let NewChoose = [...choose];
    NewChoose.push(txt);
    misol[misolNumber].words.splice(i, 1);
    setchoose(NewChoose);
  }
const random = (v,i)=>
{ 
  misol[misolNumber]==misol[misolNumber]*Math.random(2,10);
}
  const deleteChooseWord = (v, i) => {
    let NewChoose = [...choose];
    NewChoose.splice(i, 1);
    misol[misolNumber].words.push(v);
    setchoose(NewChoose);
  }

  const answer = () => {
    if (JSON.stringify(choose) == JSON.stringify(misol[misolNumber].uzbek)) {
      setjavob(<FontAwesomeIcon icon={faCheck} className="text-success fs-3" />);
      setnextButton(true);
    } else {
      setjavob(<FontAwesomeIcon icon={faTimes} className="text-danger fs-3" />)
    };

    if (misolNumber == 10) {
      setjavob("Misollar tugadi");
      setisEnd(true)
    }
  }

  const next = () => {
    if (misolNumber <= 10) {
      setmisolNumber(misolNumber + 1);
      setchoose([]);
      setjavob("");
      setnextButton(false);
    }
  }

  const talk = () => {
    var msg = new SpeechSynthesisUtterance(misol[misolNumber].english);
    window.speechSynthesis.speak(msg);
  }

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-8 offset-2">
          <h3 className="text-center">Berilgan sozning ozbekcha tarjimasini toping</h3>
          <div className="d-flex align-items-center">
            <img src={misol[misolNumber].img} alt="?" style={{ width: "40%" }} />
            <div className="d-flex align-items-center w-50 border px-3 py-2 misol" style={{ borderRadius: "15px" }}>
              <Button className="fs-4 me-2 text-primary" onClick={talk}><FontAwesomeIcon icon={faVolumeUp} /></Button>
              <p className="m-0 fs-4">{misol[misolNumber].english}</p>
            </div>
          </div>
        </div>
        <div className="col-12 border-top border-bottom py-2" style={{ minHeight: "7rem" }}>
          {
            choose.map((v, i) => {
              return <Button variant="contained" color="secondary" className="me-3" onClick={() => deleteChooseWord(v, i)} key={i}>{v}</Button>
            })
          }
        </div>
        <div className="col-12 py-3">
          {
            misol[misolNumber].words.sort((a, b) => 0.5 - Math.random()).map((v, i) => {
              return <Button variant="contained" color="primary" className="me-3" onClick={() => chooseWord(v, i)} key={i}>{v}</Button>
            })
          }
        </div>
        <div className="col-12 d-flex align-items-center justify-content-between p-3 answer">
          <p className="m-0 fw-bold">{javob}</p>
          <div>
            {nextButton && isEnd == false && <Button variant="contained" onClick={next} className="next">Keyingisi</Button> || isEnd == false && <Button className="tekshirish" variant="contained"  onClick={answer}>Tekshirish</Button>}
          </div>
        </div>
      </div>
    </div>
  )
}


