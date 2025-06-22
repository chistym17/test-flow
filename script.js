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

document.addEventListener("DOMContentLoaded", function (event) {
  const id = document.getElementById("drawflow");
  const editor = new Drawflow(id);
  editor.start();

  // --- Node data and templates ---
  const nodeTemplates = {
    ChatMessageTrigger: {
      title: "When Chat Message Received",
      subtitle: "",
      icon: "💬",
      inputs: 0,
      outputs: 1,
    },
    Switch: {
      title: "Switch",
      subtitle: "mode:Rules",
      icon: "🔀",
      inputs: 1,
      outputs: 1,
    },
    EditFields: {
      title: "Edit Fields",
      subtitle: "manual",
      icon: "✏️",
      inputs: 1,
      outputs: 1,
    },
    Filter: {
      title: "Filter",
      subtitle: "",
      icon: "-",
      inputs: 1,
      outputs: 1,
    },
    CustomerSupportAgent: {
      title: "Customer Support Agent",
      subtitle: "Tools Agent",
      icon: "",
      inputs: 1,
      outputs: 4,
    },
    GmailTrigger: {
      title: "Gmail Trigger",
      subtitle: "On new email",
      icon: "📧",
      inputs: 0,
      outputs: 1,
    },
    Embedding: {
      title: "Embedding",
      subtitle: "Text to Vector",
      icon: "🧬",
      inputs: 1,
      outputs: 1,
    },
    VectorStore: {
      title: "Vector Store",
      subtitle: "Q&A Store",
      icon: "🗄️",
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
