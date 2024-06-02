import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ConfettiExplosion from "react-confetti-explosion";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './Roadmap.css';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Button } from "@chakra-ui/react";

const Roadmap = () => {
  const [llpoints, setllpoints] = useState(null);
  const [stackpoints, setstackpoints] = useState(null);
  const [explode, setExplode] = useState(false);
  const location = useLocation();
  const navigate= useNavigate();

  useEffect(() => {
    setExplode(true);
    setTimeout(() => setExplode(false), 3000); // stop the explosion after 3 seconds

    console.log("location:", location.state.name);
    const storedToken = localStorage.getItem('token');
    console.log("storedToken:", storedToken);
    const accessToken = JSON.parse(storedToken);
    console.log("accessToken:", accessToken);
    fetch(`https://dsa-practice-site-server.onrender.com/api/retrievePoints`, {
    // fetch('https://dsa-practice-site.onrender/api/retrievePoints', {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ name:location.state.name }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from API:', data);
        setllpoints(data[0]);
        setstackpoints(data[1]);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  const handleLLClick = () => {
    if(llpoints !== 5) {
      navigate('/codeeditor', {state: {name: location.state.name}});
    } else {
      alert("You've already practiced and earned maximum points in this module!");
    }
  }

  const handleSTACKClick = () => {
    if(stackpoints !== 5) {
      navigate('/codeeditor', {state: {name: location.state.name}});
    } else {
      alert("You've already practiced and earned maximum points in this module!");
    }
  }

  const handleProfileClick = () => {
    navigate('/profile', {state: {name: location.state.name}});
  }

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

      <Button onClick={handleProfileClick}>Go to Profile Page🏠</Button>
      <VerticalTimeline>
      <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'orange', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  lightyellow' }}
    date={<><a href="https://www.quora.com/What-kinds-of-real-life-programming-situations-make-use-of-linked-lists-and-queues" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt style={{color: 'orange'}}/></a> Read up on why this concept is important in the tech industry</>} // Add the icon here
    iconStyle={{ background: 'orange', color: '#fff' }}
  >
    <h3 className="vertical-timeline-element-title">Linked List points: {llpoints != null ? llpoints : "0"}</h3>
    <p>
    <button onClick={handleLLClick}>Practice Linked List Question</button>
    </p>
  </VerticalTimelineElement>
      <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'orange', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  lightyellow' }}
    date={
    <>
      <a href="https://www.almabetter.com/bytes/articles/application-of-stack-data-structure" target="_blank" rel="noopener noreferrer">
        <FaExternalLinkAlt id='arrow2' style={{ color: 'orange', marginRight: '5px' }}/>
      </a> 
      Read up on why this concept is important in the tech industry
    </>
  } 
    iconStyle={{ background: 'orange', color: '#fff' }}
  >
    <h3 className="vertical-timeline-element-title">Stack points: {stackpoints != null ? stackpoints : "0"}</h3>
    <p>
    <button onClick={handleSTACKClick}>Practice Stack Question</button>
    </p>
  </VerticalTimelineElement>
      <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'orange', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  lightyellow' }}
    date="Coming Soon"
    iconStyle={{ background: 'orange', color: '#fff' }}
  >
    <h3 className="vertical-timeline-element-title">Points: 0</h3>
    <p>
    <button>Upcoming Module</button>
    </p>
  </VerticalTimelineElement>
      <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'orange', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  lightyellow' }}
    date="Coming Soon"
    iconStyle={{ background: 'orange', color: '#fff' }}
  >
    <h3 className="vertical-timeline-element-title">Points: 0</h3>
    <p>
    <button>Upcoming Module</button>
    </p>
  </VerticalTimelineElement>
      <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'orange', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  lightyellow' }}
    date="Coming Soon"
    iconStyle={{ background: 'orange', color: '#fff' }}
  >
    <h3 className="vertical-timeline-element-title">Points: 0</h3>
    <p>
    <button >Upcoming Module</button>
    </p>
  </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
};

export default Roadmap;