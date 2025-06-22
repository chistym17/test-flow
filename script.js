// Sidebar toggle functionality
function toggleSidebar() {
  const sidebar = document.querySelector('.components-sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  
  if (sidebar.classList.contains('sidebar-visible')) {
    closeSidebar();
  } else {
    sidebar.classList.add('sidebar-visible');
    overlay.classList.add('overlay-visible');
  }
}

function closeSidebar() {
  const sidebar = document.querySelector('.components-sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  
  sidebar.classList.remove('sidebar-visible');
  overlay.classList.remove('overlay-visible');
}

// Close sidebar on escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeSidebar();
  }
});

// Close sidebar when clicking outside
document.addEventListener('click', function(event) {
  const sidebar = document.querySelector('.components-sidebar');
  const toggleButton = document.querySelector('.sidebar-toggle');
  
  // Check if sidebar is visible and click is outside sidebar and toggle button
  if (sidebar.classList.contains('sidebar-visible') && 
      !sidebar.contains(event.target) && 
      !toggleButton.contains(event.target)) {
    closeSidebar();
  }
});

document.addEventListener("DOMContentLoaded", function (event) {
  const id = document.getElementById("drawflow");
  const editor = new Drawflow(id);
  editor.start();

  // --- Node data and templates ---
  const nodeTemplates = {
    ChatMessageTrigger: {
      title: "When Chat Message Received",
      subtitle: "",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="#63b3ed"/>
        <path d="M7 9H17V11H7V9ZM7 12H13V14H7V12Z" fill="#63b3ed"/>
      </svg>`,
      inputs: 0,
      outputs: 1,
    },
    Switch: {
      title: "Switch",
      subtitle: "mode:Rules",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#63b3ed"/>
        <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" fill="#63b3ed"/>
      </svg>`,
      inputs: 1,
      outputs: 1,
    },
    EditFields: {
      title: "Edit Fields",
      subtitle: "manual",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="#63b3ed"/>
      </svg>`,
      inputs: 1,
      outputs: 1,
    },
    Filter: {
      title: "Filter",
      subtitle: "",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z" fill="#63b3ed"/>
      </svg>`,
      inputs: 1,
      outputs: 1,
    },
    CustomerSupportAgent: {
      title: "Customer Support Agent",
      subtitle: "Tools Agent",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#63b3ed"/>
        <path d="M12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z" fill="#63b3ed"/>
        <path d="M12 16C9.33 16 6.5 17.11 6.5 19.5V20H17.5V19.5C17.5 17.11 14.67 16 12 16Z" fill="#63b3ed"/>
      </svg>`,
      inputs: 1,
      outputs: 4,
    },
    GmailTrigger: {
      title: "Gmail Trigger",
      subtitle: "On new email",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#63b3ed"/>
      </svg>`,
      inputs: 0,
      outputs: 1,
    },
    Embedding: {
      title: "Embedding",
      subtitle: "Text to Vector",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V10C2 16.08 6.38 21.55 12 23C17.62 21.55 22 16.08 22 10V7L12 2ZM12 20.99C7.59 19.89 4 15.4 4 10V8.3L12 4.19L20 8.3V10C20 15.4 16.41 19.89 12 20.99Z" fill="#63b3ed"/>
        <path d="M12 6L6 9.5V12C6 14.5 8 16.5 10.5 17.5L12 18L13.5 17.5C16 16.5 18 14.5 18 12V9.5L12 6Z" fill="#63b3ed"/>
      </svg>`,
      inputs: 1,
      outputs: 1,
    },
    VectorStore: {
      title: "Vector Store",
      subtitle: "Q&A Store",
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6H16V4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4V6H4C2.9 6 2 6.9 2 8V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V8C22 6.9 21.1 6 20 6ZM10 4H14V6H10V4ZM20 20H4V8H20V20Z" fill="#63b3ed"/>
        <path d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 12C12 12 12 12 12 12C12 12 12 12 12 12Z" fill="#63b3ed"/>
      </svg>`,
      inputs: 1,
      outputs: 1,
    },
  };

  // --- Drag and Drop functionality ---
  let draggedNode = null;
  window.drag = function (ev) {
    ev.dataTransfer.setData("node", ev.target.getAttribute("data-node"));
    draggedNode = ev.target.getAttribute("data-node");
  };

  window.drop = function (ev) {
    ev.preventDefault();
    const nodeName = ev.dataTransfer.getData("node");
    console.log("Drop event: nodeName=", nodeName);
    addNodeToDrawflow(nodeName, ev.clientX, ev.clientY);
    draggedNode = null;
  };

  window.allowDrop = function (ev) {
    ev.preventDefault();
  };

  id.addEventListener("drop", drop);
  id.addEventListener("dragover", allowDrop);

  // --- Function to add nodes ---
  function addNodeToDrawflow(name, pos_x, pos_y) {
    if (editor.editor_mode === "edit") {
      const template = nodeTemplates[name];
      if (!template) {
        console.error("Template not found for node:", name);
        return;
      }

      pos_x =
        pos_x *
          (editor.precanvas.clientWidth /
            (editor.precanvas.clientWidth * editor.zoom)) -
        editor.precanvas.getBoundingClientRect().x *
          (editor.precanvas.clientWidth /
            (editor.precanvas.clientWidth * editor.zoom));
      pos_y =
        pos_y *
          (editor.precanvas.clientHeight /
            (editor.precanvas.clientHeight * editor.zoom)) -
        editor.precanvas.getBoundingClientRect().y *
          (editor.precanvas.clientHeight /
            (editor.precanvas.clientHeight * editor.zoom));

      let html;

      if (name === "CustomerSupportAgent") {
        html = `
        <div class="node-body">
            <div class="csa-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <g>
                        <rect x="3" y="7" width="18" height="10" rx="5" fill="none" stroke="currentColor" stroke-width="2"/>
                        <circle cx="8.5" cy="12" r="1" fill="currentColor"/>
                        <circle cx="15.5" cy="12" r="1" fill="currentColor"/>
                        <rect x="10" y="15" width="4" height="1.5" rx="0.75" fill="currentColor"/>
                        <rect x="1" y="10" width="2" height="4" rx="1" fill="currentColor"/>
                        <rect x="21" y="10" width="2" height="4" rx="1" fill="currentColor"/>
                    </g>
                </svg>
            </div>
            <div class="csa-text">
                <div class="node-title">AI Agent</div>
                <div class="node-subtitle">${template.subtitle}</div>
            </div>
            <div class="node-menu">⋯</div>
        </div>
    `;
      } else if (name === "Embedding") {
        html = `
          <div class="node-body" style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100px;height:100px;border-radius:50%;background:#2d3748;border:2px solid #4a5568;">
            <div class="node-icon" style="font-size:32px;">🧬</div>
            <div class="node-title" style="font-size:13px;">Embedding</div>
            <div class="node-subtitle" style="font-size:11px;">Text to Vector</div>
          </div>
        `;
      } else if (name === "VectorStore") {
        html = `
          <div class="node-body" style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:110px;height:80px;border-radius:12px;background:#2d3748;border:2px solid #4a5568;">
            <div class="node-icon" style="font-size:32px;">🗄️</div>
            <div class="node-title" style="font-size:13px;">Vector Store</div>
            <div class="node-subtitle" style="font-size:11px;">Q&A Store</div>
          </div>
        `;
      } else {
        html = `
                    <div class="node-body">
                        <div class="node-icon">${template.icon}</div>
                        <div class="node-text">
                            <div class="node-title">${template.title}</div>
                            <div class="node-subtitle">${template.subtitle}</div>
                        </div>
                        <div class="node-menu">⋯</div>
                    </div>
                `;
      }

      editor.addNode(
        name,
        template.inputs,
        template.outputs,
        pos_x,
        pos_y,
        name,
        {},
        html
      );
    }
  }
});
