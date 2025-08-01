(function initCollectionsPlayground() {
    // Only run if collections page is present
    const collectionTypeSelect = document.getElementById('collectionType');
    if (!collectionTypeSelect) return;
    console.log('Collections Playground loaded');
    
    // Initialize collections
    let currentCollection = [];
    let currentMap = new Map();
    let isMap = false;
    
    // DOM elements
    const elementValueInput = document.getElementById('elementValue');
    const keyValueInput = document.getElementById('keyValue');
    const mapInputsDiv = document.getElementById('mapInputs');
    const sortBtn = document.getElementById('sortBtn');
    const visualizationDiv = document.getElementById('collectionVisualization');
    const timeComplexitySpan = document.getElementById('timeComplexity');
    const operationTimeSpan = document.getElementById('operationTime');
    const generatedCodeDiv = document.getElementById('generatedCode');
    const collectionCharacteristics = document.getElementById('collectionCharacteristics');
    const copyStatusDiv = document.getElementById('copyStatus');
    
    // Update UI based on collection type
    collectionTypeSelect.addEventListener('change', function() {
        const selectedType = this.value;
        isMap = selectedType.includes('map');
        mapInputsDiv.style.display = isMap ? 'block' : 'none';
        sortBtn.disabled = selectedType === 'hashset' || selectedType === 'hashmap';
        
        // Clear current collection
        currentCollection = [];
        currentMap = new Map();
        updateVisualization();
        updateCharacteristics(selectedType);
        updateCode();
    });
    
    // Operation functions
    function addElement() {
        const startTime = performance.now();
        const value = elementValueInput.value.trim();
        
        if (!value) {
            showInputError(elementValueInput);
            return;
        }
        
        if (isMap) {
            const key = keyValueInput.value.trim();
            if (!key) {
                showInputError(keyValueInput);
                return;
            }
            currentMap.set(key, value);
            updateTimeComplexity('HashMap/TreeMap - Insert: O(1) average, O(log n) TreeMap');
        } else {
            const type = collectionTypeSelect.value;
            
            if ((type === 'hashset' || type === 'treeset') && currentCollection.includes(value)) {
                alert('Set cannot contain duplicate elements');
                return;
            }
            
            currentCollection.push(value);
            let complexity = 'O(1)';
            if (type === 'arraylist') complexity = 'O(1) amortized';
            if (type === 'treeset') complexity = 'O(log n)';
            updateTimeComplexity(`${typeToName(type)} - Insert: ${complexity}`);
        }
        
        updateVisualization();
        updateCode();
        measureOperationTime(startTime);
    }
    
    function removeElement() {
        const startTime = performance.now();
        const value = elementValueInput.value.trim();
        
        if (!value) {
            showInputError(elementValueInput);
            return;
        }
        
        if (isMap) {
            const key = keyValueInput.value.trim();
            if (!key) {
                showInputError(keyValueInput);
                return;
            }
            currentMap.delete(key);
            updateTimeComplexity('HashMap/TreeMap - Remove: O(1) average, O(log n) TreeMap');
        } else {
            const type = collectionTypeSelect.value;
            let complexity = 'O(n)';
            
            if (type === 'arraylist' || type === 'linkedlist') {
                const index = currentCollection.indexOf(value);
                if (index !== -1) {
                    currentCollection.splice(index, 1);
                }
            } else if (type === 'hashset') {
                currentCollection = currentCollection.filter(item => item !== value);
                complexity = 'O(1) average';
            } else if (type === 'treeset') {
                currentCollection = currentCollection.filter(item => item !== value);
                complexity = 'O(log n)';
            }
            
            updateTimeComplexity(`${typeToName(type)} - Remove: ${complexity}`);
        }
        
        updateVisualization();
        updateCode();
        measureOperationTime(startTime);
    }
    
    function searchElement() {
        const startTime = performance.now();
        const value = elementValueInput.value.trim();
        
        if (!value) {
            showInputError(elementValueInput);
            return;
        }
        
        if (isMap) {
            const key = keyValueInput.value.trim();
            if (!key) {
                showInputError(keyValueInput);
                return;
            }
            const exists = currentMap.has(key);
            highlightItem(key, exists);
            updateTimeComplexity('HashMap/TreeMap - Search: O(1) average, O(log n) TreeMap');
        } else {
            const type = collectionTypeSelect.value;
            let complexity = 'O(n)';
            let found = currentCollection.includes(value);
            
            if (type === 'hashset') complexity = 'O(1) average';
            if (type === 'treeset') complexity = 'O(log n)';
            
            highlightItem(value, found);
            updateTimeComplexity(`${typeToName(type)} - Search: ${complexity}`);
        }
        
        measureOperationTime(startTime);
    }
    
    function clearCollection() {
        const startTime = performance.now();
        
        if (isMap) {
            currentMap.clear();
            updateTimeComplexity('HashMap/TreeMap - Clear: O(n)');
        } else {
            currentCollection = [];
            updateTimeComplexity(`${typeToName(collectionTypeSelect.value)} - Clear: O(n)`);
        }
        
        updateVisualization();
        updateCode();
        measureOperationTime(startTime);
    }
    
    function sortCollection() {
        const startTime = performance.now();
        const type = collectionTypeSelect.value;
        
        if (type === 'arraylist' || type === 'linkedlist') {
            currentCollection.sort();
            updateTimeComplexity('ArrayList/LinkedList - Sort: O(n log n)');
        }
        
        updateVisualization();
        updateCode();
        measureOperationTime(startTime);
    }
    
    function updateCode() {
        const type = collectionTypeSelect.value;
        let code = '';
        
        if (isMap) {
            const mapType = type === 'hashmap' ? 'HashMap' : 'TreeMap';
            code = `// ${mapType} initialization\n` +
                   `${mapType}<String, String> map = new ${mapType}<>();\n\n` +
                   '// Current state:\n' +
                   Array.from(currentMap.entries())
                       .map(([k, v]) => `map.put("${k}", "${v}");`)
                       .join('\n');
        } else {
            const collectionType = typeToName(type);
            code = `// ${collectionType} initialization\n` +
                   `${collectionType}<String> collection = new ${collectionType}<>();\n\n` +
                   '// Current state:\n' +
                   currentCollection.map(item => `collection.add("${item}");`)
                       .join('\n');
        }
        
        generatedCodeDiv.textContent = code;
    }
    
    function copyCode() {
        const code = generatedCodeDiv.textContent;
        if (!code || code.includes('will appear here')) {
            showCopyStatus('No code to copy', 'error');
            return;
        }
        
        navigator.clipboard.writeText(code)
            .then(() => showCopyStatus('Code copied!', 'success'))
            .catch(err => {
                console.error('Failed to copy:', err);
                showCopyStatus('Failed to copy', 'error');
            });
    }
    
    function runBenchmark() {
        const coll1 = document.getElementById('benchmarkCollection1').value;
        const coll2 = document.getElementById('benchmarkCollection2').value;
        const operation = document.getElementById('benchmarkOperation').value;
        
        // Clear previous results
        document.getElementById('benchmarkBar1').style.width = '0%';
        document.getElementById('benchmarkBar2').style.width = '0%';
        document.getElementById('benchmarkTime1').textContent = '0ms';
        document.getElementById('benchmarkTime2').textContent = '0ms';
        
        // Run benchmarks
        const time1 = benchmarkOperation(coll1, operation);
        const time2 = benchmarkOperation(coll2, operation);
        
        // Update UI with results
        const maxTime = Math.max(time1, time2) || 1; // Avoid division by zero
        const percent1 = (time1 / maxTime) * 100;
        const percent2 = (time2 / maxTime) * 100;
        
        document.getElementById('benchmarkBar1').style.width = `${percent1}%`;
        document.getElementById('benchmarkBar2').style.width = `${percent2}%`;
        document.getElementById('benchmarkTime1').textContent = `${time1}ms`;
        document.getElementById('benchmarkTime2').textContent = `${time2}ms`;
    }
    
    // Helper functions
    function benchmarkOperation(collectionType, operation) {
        const start = performance.now();
        let collection;
        const size = 1000;
        
        if (collectionType === 'hashset') {
            collection = new Set();
        } else {
            collection = [];
        }
        
        switch(operation) {
            case 'add1000':
                for (let i = 0; i < size; i++) {
                    if (collectionType === 'hashset') {
                        collection.add(`element${i}`);
                    } else {
                        collection.push(`element${i}`);
                    }
                }
                break;
            case 'insertMiddle':
                for (let i = 0; i < size; i++) {
                    if (collectionType === 'hashset') {
                        collection.add(`element${i}`);
                    } else {
                        collection.push(`element${i}`);
                    }
                }
                if (collectionType === 'hashset') {
                    collection.add('middleElement');
                } else {
                    collection.splice(Math.floor(size/2), 0, 'middleElement');
                }
                break;
            case 'search':
                for (let i = 0; i < size; i++) {
                    if (collectionType === 'hashset') {
                        collection.add(`element${i}`);
                    } else {
                        collection.push(`element${i}`);
                    }
                }
                if (collectionType === 'hashset') {
                    collection.has('element500');
                } else {
                    collection.includes('element500');
                }
                break;
            case 'iterate':
                for (let i = 0; i < size; i++) {
                    if (collectionType === 'hashset') {
                        collection.add(`element${i}`);
                    } else {
                        collection.push(`element${i}`);
                    }
                }
                if (collectionType === 'hashset') {
                    collection.forEach(() => {});
                } else {
                    collection.forEach(() => {});
                }
                break;
        }
        
        return (performance.now() - start).toFixed(2);
    }
    
    function updateVisualization() {
        visualizationDiv.innerHTML = '';
        
        if (isMap) {
            if (currentMap.size === 0) {
                visualizationDiv.innerHTML = '<div class="empty-state"><i>🗺️</i><p>Map is empty</p></div>';
                return;
            }
            
            const table = document.createElement('table');
            table.className = 'map-table';
            
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = '<th>Key</th><th>Value</th>';
            table.appendChild(headerRow);
            
            const entries = collectionTypeSelect.value === 'treemap' ? 
                Array.from(currentMap.entries()).sort() : 
                Array.from(currentMap.entries());
            
            entries.forEach(([key, value]) => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${key}</td><td>${value}</td>`;
                table.appendChild(row);
            });
            
            visualizationDiv.appendChild(table);
        } else {
            if (currentCollection.length === 0) {
                visualizationDiv.innerHTML = '<div class="empty-state"><i>📦</i><p>Collection is empty</p></div>';
                return;
            }
            
            const list = document.createElement('div');
            list.className = 'collection-list';
            
            const items = collectionTypeSelect.value === 'treeset' ? 
                [...currentCollection].sort() : 
                currentCollection;
            
            items.forEach(item => {
                const element = document.createElement('div');
                element.className = 'collection-item';
                element.textContent = item;
                list.appendChild(element);
            });
            
            visualizationDiv.appendChild(list);
        }
    }
    
    function highlightItem(item, found) {
        const items = visualizationDiv.querySelectorAll('.collection-item, .map-table td');
        
        items.forEach(el => {
            el.classList.remove('highlight');
            if (el.textContent === item) {
                el.classList.add('highlight');
            }
        });
        
        if (!found) {
            alert(`"${item}" not found`);
        }
    }
    
    function updateTimeComplexity(complexity) {
        timeComplexitySpan.textContent = `Time Complexity: ${complexity}`;
    }
    
    function measureOperationTime(startTime) {
        const duration = (performance.now() - startTime).toFixed(2);
        operationTimeSpan.textContent = `Last operation: ${duration}ms`;
    }
    
    function updateCharacteristics(type) {
        const characteristics = {
            'arraylist': [
                'Dynamic resizing array',
                'Fast random access (O(1))',
                'Slow insertions/deletions in middle (O(n))',
                'Good for frequent access, rare modifications'
            ],
            'linkedlist': [
                'Doubly-linked list implementation',
                'Fast insertions/deletions (O(1))',
                'Slow random access (O(n))',
                'Good for frequent modifications'
            ],
            'hashset': [
                'Hash table implementation',
                'No duplicate elements',
                'Constant time add/remove/contains (O(1)) average',
                'No ordering guarantees'
            ],
            'treeset': [
                'Red-black tree implementation',
                'Elements automatically sorted',
                'Logarithmic time operations (O(log n))',
                'Maintains elements in sorted order'
            ],
            'hashmap': [
                'Hash table implementation',
                'Key-value pairs',
                'Constant time operations (O(1)) average',
                'No ordering guarantees'
            ],
            'treemap': [
                'Red-black tree implementation',
                'Keys automatically sorted',
                'Logarithmic time operations (O(log n))',
                'Maintains keys in sorted order'
            ]
        };
        
        collectionCharacteristics.innerHTML = characteristics[type]
            .map(item => `<li>${item}</li>`)
            .join('');
    }
    
    function typeToName(type) {
        const names = {
            'arraylist': 'ArrayList',
            'linkedlist': 'LinkedList',
            'hashset': 'HashSet',
            'treeset': 'TreeSet',
            'hashmap': 'HashMap',
            'treemap': 'TreeMap'
        };
        return names[type] || type;
    }
    
    function showInputError(element) {
        element.classList.add('input-error');
        setTimeout(() => element.classList.remove('input-error'), 1000);
    }
    
    function showCopyStatus(message, type) {
        copyStatusDiv.textContent = message;
        copyStatusDiv.className = type;
        setTimeout(() => {
            copyStatusDiv.textContent = '';
            copyStatusDiv.className = '';
        }, 2000);
    }
    
    // Event delegation for button clicks
    document.addEventListener('click', function(e) {
        if (!e.target.matches('[data-action]')) return;
        
        const action = e.target.getAttribute('data-action');
        switch(action) {
            case 'add': addElement(); break;
            case 'remove': removeElement(); break;
            case 'search': searchElement(); break;
            case 'clear': clearCollection(); break;
            case 'sort': sortCollection(); break;
            case 'updateCode': updateCode(); break;
            case 'copyCode': copyCode(); break;
            case 'runBenchmark': runBenchmark(); break;
        }
    });
    
    // Initialize
    updateCharacteristics(collectionTypeSelect.value);
    updateCode();
})();