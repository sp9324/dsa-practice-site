import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { Typewriter } from 'react-simple-typewriter'
import './ProfilePage.css';
import ConfettiExplosion from "react-confetti-explosion";

const ProfilePage = () => {
  const [llpoints, setllpoints] = useState(null);
  const [stackpoints, setstackpoints] = useState(null);
  const [totalpoints, setTotalPoints] = useState(null);
  const [explode, setExplode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setExplode(true);
    console.log("location:", location.state.name);
    const storedToken = localStorage.getItem('token');
    console.log("storedToken:", storedToken);
    const accessToken = JSON.parse(storedToken);
    console.log("accessToken:", accessToken);
    // fetch(`http://localhost:3001/api/retrievePoints`, {
    fetch('https://dsa-practice-site.onrender.com/api/retrievePoints', {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ name: location.state.name }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from API:', data);
        setllpoints(data[0]);
        setstackpoints(data[1]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });

  useEffect(() => {
    console.log("location:", location.state.name);
    const storedToken = localStorage.getItem('token');
    console.log("storedToken:", storedToken);
    const accessToken = JSON.parse(storedToken);
    console.log("accessToken:", accessToken);
    // fetch(`http://localhost:3001/api/retrieveTotalPoints`, {
    fetch('https://dsa-practice-site.onrender.com/api/retrieveTotalPoints', {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ name: location.state.name }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from API:', data);
        setTotalPoints(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });

  const handleRoadmapClick = () => {
    navigate('/roadmap', { state: { name: location.state.name } });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleDownloadCertificate = (event, type) => {
    if(type === 'LinkedList' && llpoints < 5) {
      event.preventDefault();
      alert('You need 5 Linked List points to redeem this certificate!');
    } else if(type === 'Stack' && stackpoints < 5) {
      event.preventDefault();
      alert('You need 5 Stack points to redeem this certificate!');
    } else if(totalpoints-1>0) {
      const storedToken = localStorage.getItem('token');
      console.log("storedToken:", storedToken);
      const accessToken = JSON.parse(storedToken);
      console.log("accessToken:", accessToken);
      // fetch('http://localhost:3001/api/deductCertPoints', {
      fetch('https://dsa-practice-site.onrender.com/api/deductCertPoints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name: location.state.name }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Response from API:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      event.preventDefault();
      alert('You do not have enough total points to redeem this certificate!');
    }
  };
  
  const handleDownloadNotes = (event) => {
    if(totalpoints-2>0) {
      const storedToken = localStorage.getItem('token');
      console.log("storedToken:", storedToken);
      const accessToken = JSON.parse(storedToken);
      console.log("accessToken:", accessToken);
      // fetch('http://localhost:3001/api/deductNotesPoints', {
      fetch('https://dsa-practice-site.onrender.com/api/deductNotesPoints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name: location.state.name }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Response from API:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      event.preventDefault();
      alert('You do not have enough points to redeem these notes!');
    }
  };

  const handleType = (count) => {
    // access word count number
    console.log(count);
}

const handleDone = () => {
    console.log(`Done after 5 loops!`);
}

const handleYTClick = (event) => {
  if(totalpoints-3>0) {
    const storedToken = localStorage.getItem('token');
    console.log("storedToken:", storedToken);
    const accessToken = JSON.parse(storedToken);
    console.log("accessToken:", accessToken);
    // fetch('http://localhost:3001/api/deductYTPoints', {
    fetch('https://dsa-practice-site.onrender.com/api/deductYTPoints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name: location.state.name }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response from API:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  } else {
    event.preventDefault();
    alert('You do not have enough points to redeem this YouTube video!');
  }
};

const handleLogout = () => {
  localStorage.clear();
  console.log('User logged out', location.state.name);
  navigate('/login');
};

  const userName=capitalizeFirstLetter(location.state.name);
  
  return (
    <div>
    {explode && (
        <div style={{ position: "absolute", left: 0 }}>
          <ConfettiExplosion force={0.6} duration={4000} particleCount={100} width={1300} />
        </div>
      )}
      {explode && (
        <div style={{ position: "absolute", right: 0 }}>
          <ConfettiExplosion force={0.6} duration={4000} particleCount={100} width={1300} />
        </div>
      )}
    <div className="welcome-container">
    <h1 style={{ paddingTop: '5rem', margin: 'auto 0', fontWeight: 'normal' }}>
    👋🏼Welcome, {' '}
                <span style={{ color: 'orange', fontWeight: 'bold' }}>
                    {/* Style will be inherited from the parent element */}
                    <Typewriter
                        words={[userName]}
                        loop={5}
                        cursor
                        cursorStyle='_'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                        onLoopDone={handleDone}
                        onType={handleType}
                    />
                </span>
            </h1>
            </div>
            <div id="points-div">
    <p className='points'>Linked List Points: {llpoints}</p>
    <p className='points'>Stack Points: {stackpoints}</p>
    <p className='points'>Upcoming Module Points: 0</p>
    <p className='points'>Upcoming Module Points: 0</p>
    <p className='points'>Upcoming Module Points: 0</p>
    <p className='points'>Total Points: {totalpoints}</p>
</div>
<div id="points-redemption-div">
    <p id='redeem-heading'>Redeem your points! Download certificates & notes, or enjoy a video tutorial!</p>
    <div className='redemption-options-div'>
    <a className='redemption-options' href="/Linked_List_Completion_Certificate.pdf" download onClick={(event) => handleDownloadCertificate(event, 'LinkedList')}>Download Linked List Completion Certificate🔥 (Cost: 1 point)</a>
        </div>
        <br></br>
        <div className='redemption-options-div'>
        <a className='redemption-options' href="/Stack_Completion_Certificate.pdf" download onClick={(event) => handleDownloadCertificate(event, 'Stack')}>Download Stack Completion Certificate🌟 (Cost: 1 point)</a>
        </div>
    <br></br>
    <div className='redemption-options-div'>
    <a className='redemption-options' href="/Linked_List_Notes.pdf" download onClick={handleDownloadNotes}>Download Linked List Notes📝 (Cost: 2 points)</a>
    </div>
    <br></br>
    <div className='redemption-options-div'>
    <a className='redemption-options' href="/Stack_Notes.pdf" download onClick={handleDownloadNotes}>Download Stack Notes📝 (Cost: 2 points)</a>
    </div>
    <br></br>
    <div className='redemption-options-div'>
    <a className='redemption-options' href="https://www.youtube.com/watch?v=LOHBGyK3Hbs" target="_blank" onClick={handleYTClick} rel="noreferrer">Watch Linked List Tutorial📺 (Cost: 3 points)</a>
    </div>
    <br></br>
    <div className='redemption-options-div'>
    <a className='redemption-options' href="https://www.youtube.com/watch?v=-n2rVJE4vto" target="_blank" onClick={handleYTClick} rel="noreferrer">Watch Stack Tutorial📺 (Cost: 3 points)</a>
    </div>
    <br></br>
    <div className='redemption-options-div'>
    <p className='redemption-options'>Upcoming Webinar With Industy Experts📺 (Cost: 10 points)</p>
    </div>
    </div>
    <Button id='roadmap-button' onClick={handleRoadmapClick}>Go to roadmap↗️</Button>
    <Button id='logout-button' onClick={handleLogout}>Logout ❌</Button>
    <p id='note1'>Spend your earnings wisely! Don't waste your points by downloading the same material multiple times.</p>
    <br></br>
    <p id='note2'>Kindly refresh your page to see your updated total points (i.e., the points you have remaining). Module-wise points shown are points accumulated till date.</p>
    </div>
  );

}; 

export default ProfilePage;