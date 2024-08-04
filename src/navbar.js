document.addEventListener('DOMContentLoaded', function() {
    const navbarHTML = `
        <div class="navbar">
            <div class="logo">NPCForge</div>
            <label for="nav-btn" class="icon">
                <span class="fa fa-bars"></span>
            </label>
            <input type="checkbox" id="nav-btn" class="hide-input">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li>
                    <label for="gen-btn" class="nav-show">Generators +</label>
                    <a>Generators <span class="fas fa-caret-down" id="navbarIcon"></span></a>
                    <input type="checkbox" id="gen-btn" class="hide-input">
                    <ul>
                        <li>
                            <a href="townNPCGenerator.html">Town NPC's</a>
                            <a href="#">Generator</a>
                            <a href="#">Generator</a>
                        </li>
                    </ul>
                </li>
                <li><a href="#">About</a></li>
            </ul>
        </div>
    `;

    // Insert the navbar HTML into the element with id 'navbar-container'
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = navbarHTML;
    }
});
