<template>
<div>
<h1>tree</h1>
  <el-tree
    id="userMtree"
    ref="tree"
    :data="treeData"
    node-key="id"
    :render-content="renderContent"
    :expand-on-click-node="false"
    @node-click="nodeClick"
    :default-expanded-keys='expandedKey'
  ></el-tree>
</div>
</template>
 <script>
 export default {
  props:['treeDataObj','isUserMgt'],//父级传值 与判断哪个tree
  data () {
    return {
      treeData:[],//tree数据
      expandedKey:[],//展开节点
      checkedID:''//选中节点
    }
  },
  mounted(){
    this.treeData=this.treeDataObj.treeData
    let userMtree=document.getElementById('userMtree')
    this.$nextTick(()=>{
      userMtree.firstElementChild.classList.add("is-current");//添加选中类名
    })
    this.checkedID=this.treeData[0].id//默认选中第一个
  },
  methods:{
//编辑
    nodeEdit(ev, store, data) {
      data.isEdit = true;
      this.$nextTick(() => {//得到input
        const $input =
          ev.target.parentNode.parentNode.querySelector("input") ||
          ev.target.parentElement.parentElement.querySelector("input");
 
        !$input ? "" : $input.focus();//获取焦点
      });
    },
//失焦事件
    edit_sure(ev, data) {
      const $input =
        ev.target.parentNode.parentNode.querySelector("input") ||
        ev.target.parentElement.parentElement.querySelector("input");
      if (!$input) {
        return false;
      } else if($input.value==''){
        this.$message({
          type: "info",
          message: "内容不能为空!"
        });
      }else{//赋值value
        data.label = $input.value;
        data.isEdit = false;
      }
    },
//react方法 插入代码
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span class="tree_node_label">{this.showOrEdit(data)}</span>
          <div class="tree_node_op">
            <i class="el-icon-edit" on-click={ev => this.nodeEdit(ev, store, data)}/>
            <i class="el-icon-remove-outline" 
            on-click={() => this.nodeDelete(node, data)}/>
            {
              this.isUserMgt?<i class="el-icon-circle-plus-outline" 
                on-click={() => this.append( data)}></i>:''               
            }
          </div>
        </span>
      );
    },
    showOrEdit(data) {
      if (data.isEdit) {
        return (
          <input type="text" class="node_labe" value={data.label} 
            on-blur={ev => this.edit_sure(ev, data)} />
        );
      } else {
        return <span class="node_labe">{data.label}</span>;
      }
    },
//新增节点
    append(data) {
      const newChild = { id: new Date().getTime(), label: '', children: [],
            isEdit: true };
//判断是否有子节点
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
      this.expandedKey=[data]//展开点击节点
    },
//移除节点
    nodeDelete(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
//点击节点 移除默认选中节点
    nodeClick(data){
      let userMtree=document.getElementById('userMtree')
      userMtree.firstElementChild.classList.remove("is-current");
      this.checkedID=data.id
      console.log(data)
      this.$emit('emitClickNode',data)
    }
  }
}
 </script>
 