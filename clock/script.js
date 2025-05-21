
        const deg = 6;
        const hr = document.getElementById('hr');
        const mn = document.getElementById('mn');
        const sc = document.getElementById('sc');
        const digit = document.getElementById('digital')
        
        setInterval(() =>{
         
          let day = new Date();
          let hh = day.getHours() 
          let mm = day.getMinutes() 
          let ss = day.getSeconds() 
      
          hr.style.transform = `rotateZ(${(hh*30)+(mm*6/12)}deg)`;
          mn.style.transform = `rotateZ(${mm*6}deg)`;
          sc.style.transform = `rotateZ(${ss*6}deg)`; 
          if (hh<=12){
              digit.innerHTML = `<p> ${String(hh).padStart(2, '0')} : ${String(mm).padStart(2 , '0')} : ${String(ss).padStart(2, '0')} Am</p>`
          } else{
              digit.innerHTML = `<p> ${String(hh-12).padStart(2, '0')} : ${String(mm).padStart(2 , '0')} : ${String(ss).padStart(2, '0')} Pm</p>`

          }

        })