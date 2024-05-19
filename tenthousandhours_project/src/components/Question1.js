import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, fa1, fa2, fa3, fa4, fa5, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Button, Text } from "@chakra-ui/react";

const Question1 = () => {
    const [insert1, setInsert1] = useState(true);
    const [arrowDirection1, setArrowDirection1] = useState(true);
    const [insert2, setInsert2] = useState(true);
    const [arrowDirection2, setArrowDirection2] = useState(true);
    const [insert3, setInsert3] = useState(true);
    const [arrowDirection3, setArrowDirection3] = useState(true);
    const [insert4, setInsert4] = useState(true);
    const [arrowDirection4, setArrowDirection4] = useState(true);
    const [message, setMessage] = useState('');
    const insertCode=
    `INSERT:
    JavaScript:
    class Node {
        constructor(data) {
            this.data = data;
            this.next = null;
        }
    }
    
    class LinkedList {
        constructor() {
            this.head = null;
        }
    
        insert(data) {
            const newNode = new Node(data);
            if (!this.head) {
                this.head = newNode;
            } else {
                let current = this.head;
                while (current.next) {
                    current = current.next;
                }
                current.next = newNode;
            }
        }
    }

    TypeScript:
    class Node {
        data: any;
        next: Node | null;
    
        constructor(data: any) {
            this.data = data;
            this.next = null;
        }
    }
    
    class LinkedList {
        head: Node | null;
    
        constructor() {
            this.head = null;
        }
    
        insert(data: any) {
            const newNode = new Node(data);
            if (!this.head) {
                this.head = newNode;
            } else {
                let current = this.head;
                while (current.next) {
                    current = current.next;
                }
                current.next = newNode;
            }
        }
    }
    
    Python:
    class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node

    Java:
    class Node {
        int data;
        Node next;
    
        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }
    
    class LinkedList {
        Node head;
    
        void insert(int data) {
            Node newNode = new Node(data);
            if (head == null) {
                head = newNode;
            } else {
                Node current = head;
                while (current.next != null) {
                    current = current.next;
                }
                current.next = newNode;
            }
        }
    }

    C#:
    public class Node
{
    public int data;
    public Node next;

    public Node(int data)
    {
        this.data = data;
        this.next = null;
    }
}

public class LinkedList
{
    public Node head;

    public void Insert(int data)
    {
        Node newNode = new Node(data);
        if (head == null)
        {
            head = newNode;
        }
        else
        {
            Node current = head;
            while (current.next != null)
            {
                current = current.next;
            }
            current.next = newNode;
        }
    }
}

    PHP:
    class Node {
        public $data;
        public $next;
    
        public function __construct($data) {
            $this->data = $data;
            $this->next = null;
        }
    }
    
    class LinkedList {
        public $head;
    
        public function __construct() {
            $this->head = null;
        }
    
        public function insert($data) {
            $newNode = new Node($data);
            if ($this->head === null) {
                $this->head = $newNode;
            } else {
                $current = $this->head;
                while ($current->next !== null) {
                    $current = $current->next;
                }
                $current->next = $newNode;
            }
        }
    }   
    
    DELETE:

    JavaScript:
    class Node {
        constructor(data) {
            this.data = data;
            this.next = null;
        }
    }
    
    class LinkedList {
        constructor() {
            this.head = null;
        }
    
        deleteNode(value) {
            let current = this.head;
            let prev = null;
    
            while (current !== null) {
                if (current.data === value) {
                    if (prev === null) {
                        this.head = current.next;
                    } else {
                        prev.next = current.next;
                    }
                    return;
                }
                prev = current;
                current = current.next;
            }
        }
    }

    TypeScript:
    class Node {
        data: any;
        next: Node | null;
    
        constructor(data: any) {
            this.data = data;
            this.next = null;
        }
    }
    
    class LinkedList {
        head: Node | null;
    
        constructor() {
            this.head = null;
        }
    
        deleteNode(value: any) {
            let current = this.head;
            let prev = null;
    
            while (current !== null) {
                if (current.data === value) {
                    if (prev === null) {
                        this.head = current.next;
                    } else {
                        prev.next = current.next;
                    }
                    return;
                }
                prev = current;
                current = current.next;
            }
        }
    }

    Python:
    class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def delete_node(self, value):
        current = self.head
        prev = None

        while current:
            if current.data == value:
                if prev:
                    prev.next = current.next
                else:
                    self.head = current.next
                return
            prev = current
            current = current.next

    Java:
    class Node {
        int data;
        Node next;
    
        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }
    
    class LinkedList {
        Node head;
    
        void deleteNode(int value) {
            Node current = head;
            Node prev = null;
    
            while (current != null) {
                if (current.data == value) {
                    if (prev == null) {
                        head = current.next;
                    } else {
                        prev.next = current.next;
                    }
                    return;
                }
                prev = current;
                current = current.next;
            }
        }
    }

    C#:
    public class Node
{
    public int data;
    public Node next;

    public Node(int data)
    {
        this.data = data;
        this.next = null;
    }
}

public class LinkedList
{
    public Node head;

    public void DeleteNode(int value)
    {
        Node current = head;
        Node prev = null;

        while (current != null)
        {
            if (current.data == value)
            {
                if (prev == null)
                {
                    head = current.next;
                }
                else
                {
                    prev.next = current.next;
                }
                return;
            }
            prev = current;
            current = current.next;
        }
    }
}

    PHP:
    class Node {
        public $data;
        public $next;
    
        public function __construct($data) {
            $this->data = $data;
            $this->next = null;
        }
    }
    
    class LinkedList {
        public $head;
    
        public function __construct() {
            $this->head = null;
        }
    
        public function deleteNode($value) {
            $current = $this->head;
            $prev = null;
    
            while ($current !== null) {
                if ($current->data === $value) {
                    if ($prev === null) {
                        $this->head = $current->next;
                    } else {
                        $prev->next = $current->next;
                    }
                    return;
                }
                $prev = $current;
                $current = $current->next;
            }
        }
    }    
    `
    const reverseCode=
    `REVERSE:

    JavaScript:
    class Node {
        constructor(data) {
            this.data = data;
            this.next = null;
        }
    }
    
    class LinkedList {
        constructor() {
            this.head = null;
        }
    
        insert(data) {
            const newNode = new Node(data);
            if (!this.head) {
                this.head = newNode;
            } else {
                let current = this.head;
                while (current.next) {
                    current = current.next;
                }
                current.next = newNode;
            }
        }
    
        reverse() {
            let prev = null;
            let current = this.head;
            let next = null;
    
            while (current !== null) {
                next = current.next;
                current.next = prev;
                prev = current;
                current = next;
            }
            this.head = prev;
        }
    }

    TypeScript:
    class Node {
        data: any;
        next: Node | null;
    
        constructor(data: any) {
            this.data = data;
            this.next = null;
        }
    }
    
    class LinkedList {
        head: Node | null;
    
        constructor() {
            this.head = null;
        }
    
        insert(data: any) {
            const newNode = new Node(data);
            if (!this.head) {
                this.head = newNode;
            } else {
                let current = this.head;
                while (current.next) {
                    current = current.next;
                }
                current.next = newNode;
            }
        }
    
        reverse() {
            let prev: Node | null = null;
            let current: Node | null = this.head;
            let next: Node | null = null;
    
            while (current !== null) {
                next = current.next;
                current.next = prev;
                prev = current;
                current = next;
            }
            this.head = prev;
        }
    }

    Python:
    class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node

    def reverse(self):
        prev = None
        current = self.head

        while current:
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node

        self.head = prev

    Java:
    class Node {
        int data;
        Node next;
    
        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }
    
    class LinkedList {
        Node head;
    
        void insert(int data) {
            Node newNode = new Node(data);
            if (head == null) {
                head = newNode;
            } else {
                Node current = head;
                while (current.next != null) {
                    current = current.next;
                }
                current.next = newNode;
            }
        }
    
        void reverse() {
            Node prev = null;
            Node current = head;
            Node next = null;
    
            while (current != null) {
                next = current.next;
                current.next = prev;
                prev = current;
                current = next;
            }
            head = prev;
        }
    }

    C#:
    public class Node
{
    public int data;
    public Node next;

    public Node(int data)
    {
        this.data = data;
        this.next = null;
    }
}

public class LinkedList
{
    public Node head;

    public void Insert(int data)
    {
        Node newNode = new Node(data);
        if (head == null)
        {
            head = newNode;
        }
        else
        {
            Node current = head;
            while (current.next != null)
            {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    public void Reverse()
    {
        Node prev = null;
        Node current = head;
        Node next = null;

        while (current != null)
        {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        head = prev;
    }
}

    PHP:
    class Node {
        public $data;
        public $next;
    
        public function __construct($data) {
            $this->data = $data;
            $this->next = null;
        }
    }
    
    class LinkedList {
        public $head;
    
        public function __construct() {
            $this->head = null;
        }
    
        public function insert($data) {
            $newNode = new Node($data);
            if ($this->head === null) {
                $this->head = $newNode;
            } else {
                $current = $this->head;
                while ($current->next !== null) {
                    $current = $current->next;
                }
                $current->next = $newNode;
            }
        }
    
        public function reverse() {
            $prev = null;
            $current = $this->head;
            $next = null;
    
            while ($current !== null) {
                $next = $current->next;
                $current->next = $prev;
                $prev = $current;
                $current = $next;
            }
            $this->head = $prev;
        }
    }
    `
    const handleReverse1 = () => {
        setArrowDirection1(!arrowDirection1);
        setMessage(reverseCode);
    };
    const handleInsert1 = () => {
        setInsert1(!insert1);
        setMessage(insertCode);
    };

    const handleReverse2 = () => {
        setArrowDirection2(!arrowDirection2);
        setMessage('Reverse code here');
    };
    const handleInsert2 = () => {
        setInsert2(!insert2);
        setMessage(insertCode);
    };

    const handleReverse3 = () => {
        setArrowDirection3(!arrowDirection3);
        setMessage('Reverse code here');
    };
    const handleInsert3 = () => {
        setInsert3(!insert3);
        setMessage(insertCode);
    };

    const handleReverse4 = () => {
        setArrowDirection4(!arrowDirection4);
        setMessage('Reverse code here');
    };
    const handleInsert4 = () => {
        setInsert4(!insert4);
        setMessage(insertCode);
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'centre', height: '100vh'}}>
            <Text mt={4} mb={8} ml={10} mr={10} color= 'orange' textAlign='center' fontSize='lg'>Click the 1st Pointer button to insert and delete the 1st pointer and so on for the others. Reverse reverses the pointers. Play around with the linked list and check out the auto-generated code</Text>
        <div style= {{marginLeft: '52px', marginBottom: '60px'}}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'centre', marginLeft: '70px'}}>
            <Button size="md" onClick={handleInsert1}>1st Pointer</Button>
            <Button size="md" onClick={handleReverse1}>Reverse 1st Next Pointer</Button>

            <Button size="md" onClick={handleInsert2}>2nd Pointer</Button>
            <Button size="md" onClick={handleReverse2}>Reverse 2nd Next Pointer</Button>

            <Button size="md" onClick={handleInsert3}>3rd Pointer</Button>
            <Button size="md" onClick={handleReverse3}>Reverse 3rd Next Pointer</Button>

            <Button size="md" onClick={handleInsert4}>4th Pointer</Button>
            <Button size="md" onClick={handleReverse4}>Reverse 4th Next Pointer</Button>
</div>
</div>
<div style={{display: 'flex', flexDirection: 'row', alignItems: 'centre', marginLeft: '580px'}}>
            <FontAwesomeIcon icon={fa1} size="2xl" style={{color: "orange", padding: '12px'}} />
            {insert1 && <FontAwesomeIcon icon={arrowDirection1 ? faArrowRight : faArrowLeft} size="2xl" style={{color: "orange", padding: '12px'}} />}
            <FontAwesomeIcon icon={fa2} size="2xl" style={{color: "orange", padding: '12px'}} />
            {insert2 && <FontAwesomeIcon icon={arrowDirection2 ? faArrowRight : faArrowLeft} size="2xl" style={{color: "orange", padding: '12px'}} />}
            <FontAwesomeIcon icon={fa3} size="2xl" style={{color: "orange", padding: '12px'}} />
            {insert3 && <FontAwesomeIcon icon={arrowDirection3 ? faArrowRight : faArrowLeft} size="2xl" style={{color: "orange", padding: '12px'}} />}
            <FontAwesomeIcon icon={fa4} size="2xl" style={{color: "orange", padding: '12px'}} />
            {insert4 && <FontAwesomeIcon icon={arrowDirection4 ? faArrowRight : faArrowLeft} size="2xl" style={{color: "orange", padding: '12px'}} />}
            <FontAwesomeIcon icon={fa5} size="2xl" style={{color: "orange", padding: '12px'}} />
        </div>
        <div style={{textAlign: 'center', marginTop: '20px'}}>
            <pre style={{color: 'lightblue'}}>{message}</pre> {/* Use pre tag here */}
        </div>
        </div>
    );
};

export default Question1;