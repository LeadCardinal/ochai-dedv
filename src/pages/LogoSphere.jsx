import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const LOGOS = Array.from({length:70},(_,i)=>`/images/logo_${String(i+1).padStart(3,'0')}.avif`);
const RADIUS = 4.2, TILE_SIZE = 0.72, TILE_DEPTH = 0.04, HOVER_LIFT = 0.32, PRESENT_INTERVAL = 3200;

const LogoSphere = () => {
  const mountRef = useRef(null);
  const stateRef = useRef({});

  useEffect(() => {
    let animId;
    const s = stateRef.current;

    function loadThree() {
      return new Promise((resolve) => {
        if (window.THREE) { resolve(window.THREE); return; }
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
        const poll = setInterval(() => {
          if (window.THREE) { clearInterval(poll); resolve(window.THREE); }
        }, 50);
      });
    }

    async function init() {
      const T = await loadThree();
      const el = mountRef.current;
      if (!el) return;

      const renderer = new T.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(el.clientWidth, el.clientHeight);
      renderer.setClearColor(0x06070f, 1);
      el.appendChild(renderer.domElement);

      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(52, el.clientWidth / el.clientHeight, 0.1, 100);
      camera.position.z = 9.5;

      scene.add(new T.AmbientLight(0xffffff, 0.85));
      const dir = new T.DirectionalLight(0x64d2ff, 0.6);
      dir.position.set(5, 8, 5);
      scene.add(dir);

      const sphereGroup = new T.Group();
      scene.add(sphereGroup);

      const raycaster = new T.Raycaster();
      const mouse = new T.Vector2();
      const clock = new T.Clock();

      Object.assign(s, {
        T, renderer, scene, camera, sphereGroup, raycaster, mouse, clock,
        tiles: [], rotVel: {x:0,y:0}, isDragging: false,
        hoveredTile: null, mode: "present", presentIdx: 0, modalOpen: false
      });

      const golden = Math.PI * (3 - Math.sqrt(5));
      const n = LOGOS.length;
      const loader = new T.TextureLoader();

      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = golden * i;
        const pos = new T.Vector3(Math.cos(theta) * r * RADIUS, y * RADIUS, Math.sin(theta) * r * RADIUS);

        const geo = new T.BoxGeometry(TILE_SIZE, TILE_SIZE, TILE_DEPTH);
        const mat = new T.MeshStandardMaterial({ color: 0x1a2030, roughness: 0.4, metalness: 0.3, transparent: true, opacity: 0.92 });
        const tile = new T.Mesh(geo, mat);
        tile.position.copy(pos);
        tile.lookAt(0, 0, 0);

        loader.load(LOGOS[i], (tex) => {
          tex.colorSpace = T.SRGBColorSpace;
          tile.material = new T.MeshStandardMaterial({ map: tex, transparent: true, roughness: 0.35, metalness: 0.15, alphaTest: 0.01 });
        });

        tile.userData = {
          idx: i, src: LOGOS[i], basePos: pos.clone(),
          normal: pos.clone().normalize(), lift: 0, targetLift: 0,
          wave: Math.random() * Math.PI * 2, waveSpeed: 0.4 + Math.random() * 0.3
        };
        sphereGroup.add(tile);
        s.tiles.push(tile);
      }

      bindEvents();
      startPresentation();
      animate();
    }

    function animate() {
      animId = requestAnimationFrame(animate);
      const t = s.clock.getElapsedTime();
      if (!s.isDragging && !s.modalOpen) {
        s.rotVel.x *= 0.92; s.rotVel.y *= 0.92;
        s.sphereGroup.rotation.x += s.rotVel.x;
        s.sphereGroup.rotation.y += s.rotVel.y + 0.0012;
      }
      s.tiles.forEach(tile => {
        const ud = tile.userData;
        ud.lift += (ud.targetLift - ud.lift) * 0.12;
        const wave = Math.sin(t * ud.waveSpeed + ud.wave) * 0.025;
        tile.position.copy(ud.basePos).addScaledVector(ud.normal, ud.lift + wave);
        tile.lookAt(s.sphereGroup.position);
      });
      s.renderer.render(s.scene, s.camera);
    }

    function checkHover() {
      s.raycaster.setFromCamera(s.mouse, s.camera);
      const hits = s.raycaster.intersectObjects(s.tiles);
      const newH = hits.length > 0 ? hits[0].object : null;
      if (newH !== s.hoveredTile) {
        if (s.hoveredTile) s.hoveredTile.userData.targetLift = 0;
        s.hoveredTile = newH;
        if (s.hoveredTile) s.hoveredTile.userData.targetLift = HOVER_LIFT;
      }
    }

    function bindEvents() {
      const canvas = s.renderer.domElement;
      let prevMouse = {x:0,y:0};

      canvas.addEventListener("mousedown", e => {
        s.isDragging = false;
        prevMouse = {x: e.clientX, y: e.clientY};
        s.rotVel = {x:0, y:0};
        if (s.mode === "present") { stopPresentation(); if (s.idleTimer) clearTimeout(s.idleTimer); }
      });
      canvas.addEventListener("mousemove", e => {
        const dx = e.clientX - prevMouse.x, dy = e.clientY - prevMouse.y;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) s.isDragging = true;
        if (e.buttons === 1 && s.isDragging) {
          s.sphereGroup.rotation.y += dx * 0.007;
          s.sphereGroup.rotation.x += dy * 0.007;
          s.rotVel = {x: dy * 0.007, y: dx * 0.007};
          prevMouse = {x: e.clientX, y: e.clientY};
        }
        const rect = canvas.getBoundingClientRect();
        s.mouse.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
        checkHover();
        if (s.mode === "present") { if (s.idleTimer) clearTimeout(s.idleTimer); s.idleTimer = setTimeout(() => startPresentation(), 5000); }
      });
      canvas.addEventListener("mouseup", () => {
        s.isDragging = false;
        if (s.mode === "present") { if (s.idleTimer) clearTimeout(s.idleTimer); s.idleTimer = setTimeout(() => startPresentation(), 5000); }
      });
      canvas.addEventListener("click", e => {
        if (s.isDragging) return;
        const rect = canvas.getBoundingClientRect();
        s.mouse.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
        s.raycaster.setFromCamera(s.mouse, s.camera);
        const hits = s.raycaster.intersectObjects(s.tiles);
        if (hits.length > 0) openModal(hits[0].object);
      });

      let touchStart = {x:0,y:0};
      canvas.addEventListener("touchstart", e => {
        touchStart = {x:e.touches[0].clientX, y:e.touches[0].clientY};
        s.isDragging = false; s.rotVel = {x:0,y:0};
        if (s.mode === "present") { stopPresentation(); if (s.idleTimer) clearTimeout(s.idleTimer); }
      }, {passive:true});
      canvas.addEventListener("touchmove", e => {
        e.preventDefault();
        const dx = e.touches[0].clientX - touchStart.x, dy = e.touches[0].clientY - touchStart.y;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) s.isDragging = true;
        s.sphereGroup.rotation.y += dx * 0.006;
        s.sphereGroup.rotation.x += dy * 0.006;
        s.rotVel = {x: dy*0.006, y: dx*0.006};
        touchStart = {x:e.touches[0].clientX, y:e.touches[0].clientY};
      }, {passive:false});
      canvas.addEventListener("touchend", e => {
        if (!s.isDragging) {
          const t = e.changedTouches[0];
          const rect = canvas.getBoundingClientRect();
          s.mouse.set(((t.clientX-rect.left)/rect.width)*2-1, -((t.clientY-rect.top)/rect.height)*2+1);
          s.raycaster.setFromCamera(s.mouse, s.camera);
          const hits = s.raycaster.intersectObjects(s.tiles);
          if (hits.length > 0) openModal(hits[0].object);
        }
        s.isDragging = false;
        if (s.mode === "present") { if (s.idleTimer) clearTimeout(s.idleTimer); s.idleTimer = setTimeout(() => startPresentation(), 5000); }
      });

      window.addEventListener("resize", () => {
        if (!mountRef.current) return;
        s.camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        s.camera.updateProjectionMatrix();
        s.renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      });
      document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
    }

    function openModal(tile) {
      if (s.mode === "present") stopPresentation();
      s.modalOpen = true;
      const overlay = document.getElementById("sphere-overlay");
      const img = document.getElementById("sphere-modal-img");
      const lbl = document.getElementById("sphere-modal-label");
      if (overlay && img && lbl) {
        img.src = tile.userData.src;
        lbl.textContent = `Logo ${String(tile.userData.idx+1).padStart(3,"0")} of ${LOGOS.length}`;
        overlay.style.opacity = "1";
        overlay.style.pointerEvents = "all";
      }
    }

    function closeModal() {
      s.modalOpen = false;
      const overlay = document.getElementById("sphere-overlay");
      if (overlay) { overlay.style.opacity = "0"; overlay.style.pointerEvents = "none"; }
      if (s.mode === "present") startPresentation();
    }
    s.closeModal = closeModal;

    function startPresentation() {
      stopPresentation();
      s.presentTimer = setInterval(() => {
        if (s.modalOpen) return;
        s.presentIdx = (s.presentIdx + 1) % LOGOS.length;
        openModal(s.tiles[s.presentIdx]);
        setTimeout(closeModal, PRESENT_INTERVAL * 0.72);
      }, PRESENT_INTERVAL);
    }
    function stopPresentation() { if (s.presentTimer) { clearInterval(s.presentTimer); s.presentTimer = null; } }
    s.startPresentation = startPresentation;
    s.stopPresentation = stopPresentation;

    init();

    return () => {
      cancelAnimationFrame(animId);
      if (s.presentTimer) clearInterval(s.presentTimer);
      if (s.idleTimer) clearTimeout(s.idleTimer);
      if (s.renderer) {
        s.renderer.dispose();
        if (mountRef.current && s.renderer.domElement.parentNode === mountRef.current)
          mountRef.current.removeChild(s.renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Logo Portfolio — JCO Digital Operations</title>
        <link rel="canonical" href="https://ochai.dev/logos" />
        <meta name="description" content="37+ years of brand and logo work by Jeremy Och — interactive 3D portfolio sphere." />
      </Helmet>

      <div className="relative z-10 pt-24 pb-6 px-6 text-center">
        <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
          className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full mb-6">
          <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">Brand &amp; Identity Work</span>
        </motion.div>
        <motion.h1 initial={{opacity:0,scale:0.96}} animate={{opacity:1,scale:1}} transition={{duration:0.7,delay:0.15}}
          className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
          Logo Portfolio
        </motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.7,delay:0.3}}
          className="text-slate-400 text-base max-w-xl mx-auto">
          37+ years of brand work. Drag the sphere. Click any tile.
        </motion.p>
      </div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:0.5}}
        ref={mountRef}
        className="w-full"
        style={{height:"calc(100vh - 220px)",minHeight:"520px",background:"#06070f",cursor:"grab"}}
      />

      <div id="sphere-overlay" style={{position:"fixed",inset:0,background:"rgba(6,7,15,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,opacity:0,pointerEvents:"none",transition:"opacity .35s ease"}}>
        <div style={{position:"relative",maxWidth:"520px",width:"90%",background:"#0d1117",border:"1px solid rgba(100,210,255,0.2)",borderRadius:"16px",padding:"48px",display:"flex",flexDirection:"column",alignItems:"center",gap:"24px"}}>
          <button onClick={() => stateRef.current.closeModal && stateRef.current.closeModal()}
            style={{position:"absolute",top:"16px",right:"20px",background:"none",border:"none",color:"rgba(226,232,240,0.5)",fontSize:"28px",cursor:"pointer",lineHeight:1}}
            aria-label="Close">×</button>
          <img id="sphere-modal-img" src="" alt="Logo detail" style={{maxWidth:"340px",maxHeight:"340px",width:"100%",height:"auto",objectFit:"contain",borderRadius:"8px"}} />
          <div id="sphere-modal-label" style={{fontSize:"13px",color:"rgba(100,210,255,0.7)",letterSpacing:".12em",textTransform:"uppercase"}} />
        </div>
      </div>
    </>
  );
};

export default LogoSphere;
