<script>
  export let lec = {
    url: "",
    title: "",
    image:
      "https://www.awilsonsocialwork.net/wp-content/uploads/2017/01/placeholder.jpg",
    text: "",
    date: "",
    time: "",
    prof: "",
  };

  const driver = (img) =>
    img?.includes("google")
      ? `https://drive.google.com/uc?export=view&id=${
          img?.split("/d/")[1]?.split("/")[0]
        }`
      : img;
</script>

<img class="w-100" style="object-fit:fill;" src={driver(lec.image)} alt="" />
<div class="p-10">
  <div class="flex jtx-bw">
    <span class="f-wt7"
      >{lec.prof}: {lec.title.length > 20
        ? lec.title.slice(0, 20) + "..."
        : lec.title}</span
    >
    <span>{lec.date}, {lec.time}</span>
  </div>
  <br />
  <div>{lec.text}</div>
  <br />
  <div class="flex jtx-bw">
    <span>&nbsp;</span>
    <span><a class="btn-std" href={lec.url} style="--theme:#faa">Watch</a></span
    >
  </div>
</div>
