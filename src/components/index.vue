<template>
  <div>
    <div class="question_info_lists">
      <el-tree
        ref="tree"
        :key="tree_key"
        :data="treeData"
        node-key="id"
        :render-content="renderContent"
        :expand-on-click-node="false"
        :default-expanded-keys="defaultExpand"

      ></el-tree>

      <el-row class="add_question" v-show="add_question_flag">
        <el-col :span="12">
          <el-input v-model="new_question_name" placeholder="请输入大题名称"></el-input>
        </el-col>

        <el-col :span="12">
          <el-button size="mini" class="btn_sure" @click.stop="add_question_sure">确定</el-button>

          <el-button size="mini" class="btn_cancel" @click.stop="add_question_cancel">取消</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "tree1",

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    //      增加
    append(store, node, data) {
      var maxid = "20";
      //新增数据
      const nodeapp = {
        id: ++maxid,
        label: "增加节点",
        isEdit: true,
        children: []
      };
      data.children.push(nodeapp);
      if (!node.expanded) {
        node.expanded = true;
      }
      // const parent = node.parent;
      // const children = parent.data;
      // const cIndex = children.findIndex(d => d.id === data.id);
      // const tempChildrenNodex2 = children[cIndex]; //拿到被添加的上一级
      // console.log(tempChildrenNodex2.children[cIndex - 1]);
    },

    // 修改

    nodeEdit(ev, store, data) {
      data.isEdit = true;

      this.$nextTick(() => {
        const $input =
          ev.target.parentNode.parentNode.querySelector("input") ||
          ev.target.parentElement.parentElement.querySelector("input");

        !$input ? "" : $input.focus();
      });
    },

    edit_sure(ev, data) {
      const $input =
        ev.target.parentNode.parentNode.querySelector("input") ||
        ev.target.parentElement.parentElement.querySelector("input");

      if (!$input) {
        return false;
      } else {
        data.label = $input.value;

        data.isEdit = false;
      }
    },
    showOrEdit(data) {
      if (data.isEdit) {
        return (
          <input
            type="text"
            value={data.label}
            autofocus="autofocus"
            onfocus="this.select()"
            on-blur={ev => this.edit_sure(ev, data)}
          />
        );
      } else {
        return <span className="node_labe">{data.label}</span>;
      }
    },

    // 结构树操作group node,

    renderContent(h, { node, data, store }) {
      return (
        <span>
          <span class="el-icon-document">{this.showOrEdit(data)}</span>

          <div class="tree_node_op" style="  float: right">
        
            <i
              class="el-icon-edit"
              on-click={ev => this.nodeEdit(ev, store, data)}
            ></i>
            <i
              class="el-icon-plus"
              on-click={() => this.append(store, node, data)}
            ></i>
          </div>
        </span>
      );
    }
  },
  data() {
    return {
      filterText: "",
      treeData: [
        {
          id: 1,

          label: "一级 1",

          isEdit: false,

          children: [
            {
              id: 4,

              label: "二级 1-1",

              isEdit: false,

              children: [
                { id: 9, label: "三级 1-1-1", isEdit: false, children: [] },
                {
                  id: 10,
                  label: "三级 1-1-2",
                  isEdit: false,
                  children: []
                },
                {
                  id: 11,
                  label: "三级 1-1-3",
                  isEdit: false,
                  children: []
                }
              ]
            },

            {
              id: 12,

              label: "二级 1-2",

              isEdit: false,

              children: []
            },

            {
              id: 13,

              label: "二级 1-3",

              isEdit: false,

              children: []
            }
          ]
        },

        {
          id: 2,

          label: "一级 2",

          isEdit: false,

          children: [
            { id: 5, label: "二级 2-1", isEdit: false, children: [] },
            {
              id: 6,
              label: "二级 2-2",
              isEdit: false,
              children: []
            }
          ]
        },

        {
          id: 3,

          label: "一级 3",

          isEdit: false,

          children: [
            { id: 7, label: "二级 3-1", isEdit: false, children: [] },
            {
              id: 8,
              label: "二级 3-2",
              isEdit: false,
              children: []
            }
          ]
        }
      ],

      add_question_flag: false,

      new_question_name: "",

      tree_key: 0,

      defaultExpand: []
    };
  }
};
</script>
 
<style scoped>
</style>