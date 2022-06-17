const cursor = document.querySelector('.cursor');
   document.addEventListener('mousemove',async e => {
    cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
    })
    document.addEventListener('click', async () => {
        cursor.classList.add("expand");
        setTimeout(() => {
        cursor.classList.remove("expand");
         }, 500)
         })