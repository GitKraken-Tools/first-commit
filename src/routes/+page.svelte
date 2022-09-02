<script lang="ts">
    import { onMount } from "svelte";

    onMount(() => {
        const ui = SwaggerUIBundle({
            url: "/swagger",
            dom_id: "#swagger-ui",
            deepLinking: true,
            presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
            plugins: [SwaggerUIBundle.plugins.DownloadUrl],
            layout: "StandaloneLayout",
        });
        window.ui = ui;
    });
</script>

<div id="swagger-ui" />

<style global>
    body { margin: 0; }
</style>