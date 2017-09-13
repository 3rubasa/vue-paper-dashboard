import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Overview',
      icon: 'ti-panel',
      path: '/admin/overview'
    },
    {
      name: 'Report',
      icon: 'ti-view-list-alt',
      path: '/admin/report'
    },
    {
      name: 'Data Entry',
      icon: 'ti-pencil-alt2',
      path: '/admin/data-entry'
    },
    {
      name: 'My Overview',
      icon: 'ti-pencil-alt2',
      path: '/admin/my-overview'
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin
