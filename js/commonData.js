class fileTextImage {
    constructor(extension) {
        this.name = "";
        this.content = "";
        this.date = "";
        this.extension = extension;
    }

    getFullName() {
        let fullName = this.name + "." + this.extension;
        console.log(fullName);
        return fullName;
    }

    getSize() {
        let size = this.content.length + this.name.length;
        console.log(size);
        return size;
    }

    getTime() {
        let hours = this.date.toLocaleTimeString();
        let day = this.date.toLocaleDateString();
        let date = hours + " " + day;
        console.log(date);
        return date;
    }

    delateData() {
        this.name = "";
        this.content = "";
        this.date = "";
    }
}