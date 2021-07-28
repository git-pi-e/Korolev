<script>
    import metadata from "$lib/data/meta.json";
    const date_config = {
        weekday: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        month: "short",
        day: "numeric",
    };
</script>

<main class="tx-c w-100">
    <section id="BuildCheck" class="tx-c p-10 m-10" bg="b5e-83c">
        <h1>Build Check</h1>
        <b>{metadata.name}</b> created by <i>{metadata.author}</i> of
        <i>{metadata.owner}</i>
        was last built
        <code>
            &nbsp;
            {new Date(metadata.time).toLocaleString("en-GB", date_config)}
        </code>
        <br />
        this is build number <code>{metadata.build.current}</code> of version
        <code>{metadata.build.version}</code>
    </section>

    <hr class="w-50" />

    <section class="tx-c p-10 m-10" bg="e66-c26">
        <h1>Functional Check</h1>
        No External Functions!
    </section>
</main>

<style>
    main {
        margin: 10px 0;
    }
    section {
        margin: 0 auto;
        width: 50%;
    }
    @media (max-width: 768px) {
        section {
            width: 100%;
        }
    }
</style>
