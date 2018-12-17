import "./_side-menus.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  Button,
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import { ConnectProps } from "@/@types/types";
import { createDept } from "@/actions";
import { StateInterface } from "@/reducers";
import { DeptProps } from "@/utils/treeUtils";

interface HeaderProps {
  text: string;
  onClick(): void;
}

const MenuHeader = ({ text, onClick }: HeaderProps)  => (
  <div className="side-menus-header">
    <h4>{text}</h4>
    <button
      className="btn"
      type="button"
      onClick={onClick}
    >
      <FontAwesomeIcon icon="plus" size="lg" />
    </button>
  </div>
);

interface DeptItems extends DeptProps {
  curId?: string;
  depth?: number;
  isParent?: boolean;
}

const DeptItem = ({ _id, curId, name, isParent, depth = 1 }: DeptItems) => (
  <Link
    to={`/dashboard/${_id}`}
    className={classnames(
      `btn dept-item depth-${depth}`,
      { active: _id === curId },
    )}
  >
    <span>{ name }</span>
    {
      isParent ? (
        <Fragment>
          {
            _id === curId
              ? <FontAwesomeIcon icon="caret-up" size="lg" />
              : <FontAwesomeIcon icon="caret-down" size="lg" />
          }
        </Fragment>
      ) : null
    }
  </Link>
);

const DeptItems = ({ _id, curId, name, collapseItems, depth = 1 }: DeptItems) => (
  <Fragment>
    <DeptItem _id={_id} curId={curId} name={name} depth={depth} isParent />
    <Collapse isOpen>
      {
        collapseItems.map((item: DeptItems) => (
          <DeptItem key={item._id} curId={curId} name={item.name} depth={depth + 1} _id={item._id} />
        ))
      }
    </Collapse>
  </Fragment>
);

const DeptsTree = ({ _id, curId, name, collapseItems, depth = 1 }: DeptItems) => (
  <Fragment>
    <DeptItem _id={_id} curId={curId} name={name} depth={depth} isParent />
    <Collapse isOpen>
      {
        collapseItems.map((item: { _id: string; name: string; collapseItems?: any; }) => (
          <Fragment key={item._id}>
            {
              item.collapseItems && item.collapseItems.length !== 0
                ? (
                  <DeptItems
                    _id={item._id}
                    curId={curId}
                    name={item.name}
                    depth={depth + 1}
                    collapseItems={item.collapseItems}
                  />
                )
                : <DeptItem _id={item._id} curId={curId} name={item.name} depth={depth + 1} />
            }
          </Fragment>
        ))
      }
    </Collapse>
  </Fragment>
);

interface DeptModalProps {
  items: DeptItems[];
  ddIsOpen: boolean;
  isOpen: boolean;
  dept: string;
  parentDept: string;
  onToggle(): void;
  onClosed(): void;
  onDdChange(data: object): () => void;
  onDdToggle(): void;
  onChange(e: React.ChangeEvent): void;
  onSubmit(e: React.FormEvent): void;
}

const DeptModal = ({
  items,
  ddIsOpen,
  isOpen,
  dept,
  parentDept,
  onToggle,
  onClosed,
  onDdChange,
  onDdToggle,
  onChange,
  onSubmit,
}: DeptModalProps) => (
  <Modal
    size="sm"
    isOpen={isOpen}
    toggle={onToggle}
    onClosed={onClosed}
  >
    <ModalHeader toggle={onToggle}>부서 추가</ModalHeader>
    <Form onSubmit={onSubmit}>
      <ModalBody>
        <FormGroup>
          <Label>상위 조직</Label>
          <Dropdown isOpen={ddIsOpen} toggle={onDdToggle}>
            <DropdownToggle caret color="light">
              {
                !parentDept
                  ? "없음"
                  : items.find((item) => item._id === parentDept).name
              }
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={onDdChange({ value: "" })}
                active={parentDept === ""}
              >
                없음
              </DropdownItem>
              {
                items.map((item) => ((
                  <DropdownItem
                    key={item._id}
                    onClick={onDdChange({ value: item._id })}
                    active={item._id === parentDept}
                  >
                    { item.name }
                  </DropdownItem>
                )))
              }
            </DropdownMenu>
          </Dropdown>
        </FormGroup>
        <FormGroup>
          <Label>부서 이름</Label>
          <Input
            type="text"
            name="dept"
            value={dept}
            onChange={onChange}
            placeholder="부서 이름 입력"
            required
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" type="submit">확인</Button>
        <Button color="secondary" onClick={onToggle}>취소</Button>
      </ModalFooter>
    </Form>
  </Modal>
);

interface Props extends ConnectProps {
  deptsTree: [DeptProps?];
  parentDepts: [DeptProps?];
}

interface States {
  isOpen: boolean;
  ddIsOpen: boolean;
  dept: string;
  parentDept: string;
}

class SideMenus extends PureComponent<Props, States> {
  public state = {
    ddIsOpen: false,
    dept: "",
    isOpen: false,
    parentDept: "",
  };

  public render() {
    const { isOpen, ddIsOpen, dept, parentDept } = this.state;
    const { parentDepts, deptsTree, match } = this.props;
    return (
      <div className="side-menus">
        <MenuHeader text="조직도" onClick={this.onModalToggle} />
        <div className="side-menu-items">
          { this.renderDepts(deptsTree, match.params.id) }
        </div>
        <DeptModal
          items={parentDepts}
          isOpen={isOpen}
          ddIsOpen={ddIsOpen}
          dept={dept}
          parentDept={parentDept}
          onChange={this.onChange}
          onToggle={this.onModalToggle}
          onClosed={this.onModalClosed}
          onDdChange={this.onDropdownItemClick}
          onDdToggle={this.onDropdownToggle}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }

  private renderDepts = (data: DeptItems[], curId: string): React.ReactNode => {
    return (
      <Fragment>
        {
          data.map((dept) => {
            if (dept.collapseItems && dept.collapseItems.length !== 0) {
              return (
                <DeptsTree
                  _id={dept._id}
                  curId={curId}
                  key={dept._id}
                  name={dept.name}
                  collapseItems={dept.collapseItems}
                />
              );
            }

            return <DeptItem
              key={dept._id}
              name={dept.name}
              _id={dept._id}
              curId={curId}
            />;
          })
        }
      </Fragment>
    );
  }

  private onModalToggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  private onModalClosed = () => {
    this.setState({
      ddIsOpen: false,
      dept: "",
      parentDept: "",
    });
  }

  private onDropdownToggle = () => {
    const { ddIsOpen } = this.state;
    this.setState({ ddIsOpen: !ddIsOpen });
  }

  private onDropdownItemClick = (data: { value: string }) => () => {
    this.setState({ parentDept: data.value });
  }

  private onChange = (e: React.ChangeEvent) => {
    e.stopPropagation();
    const { name, value }: any = e.target;
    this.setState({
      [name]: value,
    } as Pick<States, keyof States>);
  }

  private onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("부서를 추가하시겠습니까?")) {
      return;
    }

    const { dispatch } = this.props;
    const { parentDept, dept } = this.state;
    const postData = {
      name: dept,
      parent_id: parentDept || null,
    };

    await dispatch(createDept(postData));
    this.onModalToggle();
  }
}

const mapStateToProps = (state: StateInterface) => ({
  deptsTree: state.company.depts_tree,
  parentDepts: state.company.parent_depts,
});
export default withRouter(connect(mapStateToProps)(SideMenus) as any);
