function allowDrop(ev) {
    ev.preventDefault();  // يسمح بالسحب والإفلات
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);  // تحديد المهمة التي يتم سحبها
    ev.target.classList.add('task-dragging');  // إضافة تأثير لتحديد العنصر المسحوب
}

function drop(ev) {
    ev.preventDefault();

    const data = ev.dataTransfer.getData("text");  // الحصول على معرف العنصر المسحوب
    const draggedTask = document.getElementById(data);

    // إزالة التأثير من العنصر المسحوب
    draggedTask.classList.remove('task-dragging');

    // إضافة العنصر إلى المكان الجديد
    const targetList = ev.target.tagName === "UL" ? ev.target  :  ev.target.closest("ul");

    // console.log(ev.target.nextElementSibling)
    // console.log(targetList)
    // targetList.appendChild(draggedTask);
    ev.target.nextElementSibling.appendChild(draggedTask);
}


function addTask() {
    const taskText = document.getElementById("new-task").value;
    if (taskText.trim() !== "") {
        const taskList = document.getElementById("not-started-tasks");
        
        // إنشاء عنصر قائمة جديد
        const newTask = document.createElement("li");
        newTask.classList.add("task");
        newTask.setAttribute("draggable", "true");
        newTask.setAttribute("ondragstart", "drag(event)");
        newTask.id = "task" + (taskList.children.length + 1);  // تعيين معرف فريد للمهمة
        newTask.textContent = taskText;

        // إضافة زر الحذف إلى المهمة
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "حذف";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function() {
            deleteTask(newTask);
        };

        // إضافة زر الحذف إلى المهمة
        newTask.appendChild(deleteBtn);

        // إضافة المهمة إلى القائمة
        taskList.appendChild(newTask);
        
        // مسح حقل الإدخال بعد إضافة المهمة
        document.getElementById("new-task").value = "";
            // عمل فوكس علي حقل الإدخال بعد إضافة المهمة
            document.getElementById("new-task").focus();
        } else {
        alert("يرجى إدخال نص المهمة!");
    }
}

function deleteTask(taskElement) {
    // حذف المهمة من القائمة
    taskElement.remove();
}

// إضافة حدث لسحب المهام من وإلى القوائم
const tasks = document.querySelectorAll('.task');
tasks.forEach(task => {
    task.addEventListener('dragend', (e) => {
        const draggedTask = e.target;
        if (draggedTask.parentElement.id === 'not-started-tasks') {
            draggedTask.classList.remove('task-dragging');
        }
    });
});


