class Node {
  constructor(parrent = null, data) {
    this.data = data;
    this.parrent = parrent;
    this.children = [];
    this.depth = !!parrent ? parrent.depth + 1 : 0;
    this.fullName = this.fullName.bind(this);
    this.existing = this.existing.bind(this);
    this.populate = this.populate.bind(this);
    this.iterate = this.iterate.bind(this);
  }

  iterate(cb) {
    this.children.forEach(child => child.iterate(cb))
    return cb(this);
  }

  fullName() {
    if (this.parrent) {
      return `${this.parrent.fullName()}${this.data}`
    }
    return '';
  }

  existing(data) {
    if (!this.children.length) return false;
    for (let child of this.children) {
      if (child.data === data) {
        return child;
      }
    }
    return false;
  }

  populate(dataArray) {
    let existingNode = this.existing(dataArray[0]);
    if (existingNode && dataArray.length === 1) return;
    if (existingNode) {
      existingNode.populate(dataArray.slice(1));
      return;
    }
    else if (!!dataArray.length) {
      let node = new Node(this, dataArray[0])
      node.parrent.children.push(node)
      if (!!dataArray.slice(1).length) {
        node.populate(dataArray.slice(1))
      }
      return;
    }
  }
}

export default class DirectoryTree {

  static groupComponentNames(names) {
    return names.map(name => name
      .replace(/([A-Z]+)/g, " $1")
      .replace(/([A-Z][a-z])/g, " $1")
      .trim()
      .split(/\s+/)
    )
  }

  static generateTree(data) {
    const splittedData = DirectoryTree.groupComponentNames(data)
    const root = new Node(null, '')

    splittedData.forEach(d => {
      root.populate(d)
    })
    return root;
  }
}
