import Node from './directoryNode'

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
